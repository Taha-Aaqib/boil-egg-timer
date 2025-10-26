import { useState, useEffect, useRef } from "react";

const BoiledEggTimer = () => {
  const eggTypes = [
    {
      id: "soft",
      name: "Soft Boiled",
      time: 360, // 6 minutes in seconds
      emoji: "🥚",
      description: "Runny yolk, set whites",
      gradient: "from-yellow-400 to-orange-400",
      shadow: "shadow-yellow-500/50",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      id: "medium",
      name: "Medium Boiled",
      time: 480, // 8 minutes in seconds
      emoji: "🍳",
      description: "Jammy yolk, firm whites",
      gradient: "from-orange-400 to-amber-500",
      shadow: "shadow-orange-500/50",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      id: "hard",
      name: "Hard Boiled",
      time: 660, // 11 minutes in seconds
      emoji: "🥚",
      description: "Fully cooked yolk",
      gradient: "from-amber-500 to-yellow-600",
      shadow: "shadow-amber-500/50",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      id: "onsen",
      name: "Onsen Egg",
      time: 780, // 13 minutes (at lower temp)
      emoji: "🍜",
      description: "Creamy Japanese style",
      gradient: "from-rose-400 to-pink-500",
      shadow: "shadow-rose-500/50",
      bgColor: "bg-rose-50 dark:bg-rose-900/20",
    },
  ];

  const [selectedEgg, setSelectedEgg] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiRef = useRef(null);

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            // Play notification sound and trigger confetti
            playNotification();
            triggerConfetti();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const playNotification = () => {
    // Create a pleasant musical notification
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    // Play a sequence of notes
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = freq;
      oscillator.type = "sine";

      const startTime = audioContext.currentTime + index * 0.2;
      gainNode.gain.setValueAtTime(volume * 0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    });
  };

  const startTimer = (eggType) => {
    setSelectedEgg(eggType);
    setTimeLeft(eggType.time);
    setIsRunning(true);
    setIsComplete(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resumeTimer = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setSelectedEgg(null);
    setIsComplete(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getProgress = () => {
    if (!selectedEgg) return 0;
    return ((selectedEgg.time - timeLeft) / selectedEgg.time) * 100;
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      } py-8 px-4 relative overflow-hidden`}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              darkMode ? "bg-white/5" : "bg-purple-200/30"
            } animate-float`}
            style={{
              width: Math.random() * 100 + 50 + "px",
              height: Math.random() * 100 + 50 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDelay: Math.random() * 5 + "s",
              animationDuration: Math.random() * 10 + 10 + "s",
            }}
          />
        ))}
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div
          ref={confettiRef}
          className="fixed inset-0 pointer-events-none z-50"
        >
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: Math.random() * 100 + "%",
                top: "-10%",
                width: "10px",
                height: "10px",
                backgroundColor: [
                  "#f59e0b",
                  "#ef4444",
                  "#3b82f6",
                  "#10b981",
                  "#8b5cf6",
                ][Math.floor(Math.random() * 5)],
                animationDelay: Math.random() * 0.5 + "s",
                animationDuration: Math.random() * 2 + 2 + "s",
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with Controls */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-end gap-4 mb-6">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-full ${
                darkMode
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-gray-800 text-white"
              } shadow-lg hover:scale-110 transform transition-all`}
              title={darkMode ? "Light Mode" : "Dark Mode"}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* Volume Control */}
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              } shadow-lg`}
            >
              <span>🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20"
                title="Volume"
              />
              <span className="text-xs font-semibold">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 flex items-center justify-center gap-4 animate-pulse-slow px-4 py-4">
            <span className="text-6xl md:text-8xl">🥚</span>
            <span
              className={`bg-gradient-to-r ${
                darkMode
                  ? "from-yellow-400 to-pink-400"
                  : "from-purple-600 to-pink-600"
              } bg-clip-text text-transparent inline-block py-3 leading-tight`}
              style={{ WebkitBoxDecorationBreak: "clone" }}
            >
              Perfect Egg Timer
            </span>
          </h1>
          <p
            className={`text-lg md:text-xl ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Perfect eggs, every single time! ⏰
          </p>
        </div>

        {/* Active Timer Display */}
        {selectedEgg && (
          <div className="mb-12 animate-slide-up">
            <div
              className={`${
                darkMode ? "bg-gray-800/90 backdrop-blur-xl" : "bg-white"
              } rounded-3xl p-8 md:p-12 shadow-2xl ${
                selectedEgg.shadow
              } border-2 ${
                darkMode ? "border-gray-700" : "border-gray-100"
              } transform hover:scale-[1.02] transition-all duration-300`}
            >
              <div className="text-center">
                <div
                  className={`text-8xl md:text-9xl mb-6 ${
                    isRunning
                      ? "animate-bounce-slow"
                      : isComplete
                      ? "animate-ping-slow"
                      : ""
                  }`}
                >
                  {selectedEgg.emoji}
                </div>
                <h2
                  className={`text-3xl md:text-4xl font-bold mb-2 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {selectedEgg.name}
                </h2>
                <p
                  className={`mb-8 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {selectedEgg.description}
                </p>

                {/* Timer Display */}
                <div className="relative mb-8">
                  <div
                    className={`text-7xl md:text-9xl font-bold bg-gradient-to-r ${selectedEgg.gradient} bg-clip-text text-transparent drop-shadow-lg`}
                  >
                    {formatTime(timeLeft)}
                  </div>
                  {isComplete && (
                    <div className="mt-4">
                      <div className="text-5xl animate-bounce mb-2">🎉</div>
                      <div className="text-3xl animate-pulse text-green-500 font-bold">
                        ✨ Your Egg is Ready! ✨
                      </div>
                      <div className="text-xl mt-2 text-gray-500">
                        Enjoy your perfectly cooked egg!
                      </div>
                    </div>
                  )}
                </div>

                {/* Circular Progress Ring */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-64 h-64">
                    <svg className="transform -rotate-90 w-64 h-64">
                      <circle
                        cx="128"
                        cy="128"
                        r="120"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className={darkMode ? "text-gray-700" : "text-gray-200"}
                      />
                      <circle
                        cx="128"
                        cy="128"
                        r="120"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 120}`}
                        strokeDashoffset={`${
                          2 * Math.PI * 120 * (1 - getProgress() / 100)
                        }`}
                        className="transition-all duration-1000 ease-linear"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%">
                          <stop
                            offset="0%"
                            className="text-yellow-400"
                            stopColor="currentColor"
                          />
                          <stop
                            offset="100%"
                            className="text-pink-500"
                            stopColor="currentColor"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`text-4xl font-bold ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {Math.round(getProgress())}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex flex-wrap gap-4 justify-center">
                  {!isRunning && timeLeft > 0 && !isComplete && (
                    <button
                      onClick={resumeTimer}
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center gap-2"
                    >
                      <span className="text-2xl">▶️</span> Resume
                    </button>
                  )}
                  {isRunning && (
                    <button
                      onClick={pauseTimer}
                      className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center gap-2"
                    >
                      <span className="text-2xl">⏸️</span> Pause
                    </button>
                  )}
                  <button
                    onClick={resetTimer}
                    className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center gap-2"
                  >
                    <span className="text-2xl">🔄</span> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Egg Type Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {eggTypes.map((eggType) => (
            <div
              key={eggType.id}
              className="group cursor-pointer"
              onClick={() => !isRunning && startTimer(eggType)}
            >
              <div
                className={`${
                  darkMode
                    ? "bg-gray-800/90 backdrop-blur-xl border-gray-700"
                    : "bg-white border-gray-100"
                } rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-110 hover:-rotate-2 transition-all duration-300 border-2 ${
                  selectedEgg?.id === eggType.id
                    ? "border-purple-500 ring-4 ring-purple-300/50 scale-105"
                    : "hover:border-purple-300"
                } ${eggType.bgColor}`}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                    {eggType.emoji}
                  </div>
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {eggType.name}
                  </h3>
                  <p
                    className={`text-sm mb-4 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {eggType.description}
                  </p>
                  <div
                    className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${eggType.gradient} text-white font-semibold shadow-lg`}
                  >
                    ⏱️ {formatTime(eggType.time)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        {!selectedEgg && (
          <div className="mt-12 text-center animate-fade-in">
            <div
              className={`${
                darkMode
                  ? "bg-gray-800/70 backdrop-blur-xl border-gray-700"
                  : "bg-white/70 backdrop-blur-sm border-gray-200"
              } rounded-2xl p-8 shadow-lg max-w-2xl mx-auto border`}
            >
              <h3
                className={`text-2xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                📋 How to Use
              </h3>
              <ol
                className={`text-left space-y-3 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                    1
                  </span>
                  <span>Place your eggs in boiling water 💦</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                    2
                  </span>
                  <span>Select your preferred egg style from above 👆</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                    3
                  </span>
                  <span>Timer starts automatically - relax and wait! ☕</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                    4
                  </span>
                  <span>
                    You'll hear a pleasant sound & see confetti when ready! 🎉
                  </span>
                </li>
              </ol>

              <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-600">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  💡 <strong>Pro Tip:</strong> Use the volume slider to adjust
                  notification sound, and toggle dark mode for a comfortable
                  viewing experience!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoiledEggTimer;
