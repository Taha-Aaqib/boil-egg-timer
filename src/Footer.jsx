import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Footer = () => {
  return (
    <div className="bg-[rgb(28,28,28)] p-8 text-sm flex flex-col md:text-base">
      {/* Company Section */}
      <div className="space-y-8 md:flex md:justify-between md:space-y-0">
        <div>
          <h1 className="uppercase text-white mb-6 tracking-widest">company</h1>
          <ul className="text-gray-400 space-y-4">
            <li>
              <Link
                to="/contact-us"
                className="cursor-pointer hover:text-white duration-300"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/faqs"
                className="cursor-pointer hover:text-white duration-300"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="/warranty-coverage"
                className="cursor-pointer hover:text-white duration-300"
              >
                Warranty Coverage
              </Link>
            </li>
            <li>
              <Link
                to="/return-refund"
                className="cursor-pointer hover:text-white duration-300"
              >
                Return & Refund
              </Link>
            </li>
            <li>
              <Link
                to="/shipping-policy"
                className="cursor-pointer hover:text-white duration-300"
              >
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link
                to="/track-your-order"
                className="cursor-pointer hover:text-white duration-300"
              >
                Track Your Order
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="cursor-pointer hover:text-white duration-300"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className="cursor-pointer hover:text-white duration-300"
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                to="/terms-of-service"
                className="cursor-pointer hover:text-white duration-300"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="/refund-policy"
                className="cursor-pointer hover:text-white duration-300"
              >
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Subscription Section */}
        <div className="space-y-4 max-w-80">
          <h1 className="uppercase text-white mb-6 tracking-widest">
            join the team
          </h1>
          <p className="text-gray-400 text-wrap">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <div className="space-y-4 flex flex-col items-start">
            <input
              type="email"
              placeholder="E-mail"
              className="w-80 md:w-72 p-4 py-4 text-white bg-[rgb(28,28,28)] border border-gray-400"
            />
            <button className="bg-white p-5 py-3 rounded-lg text-black">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Payment and Dropdown Section */}
      <div className="flex flex-col items-center space-y-4 text-gray-400 mt-8">
        <p className="text-center text-gray-500 text-wrap">© 2024 - MHZAR</p>
        {/* Payment Methods */}
        <div className="flex justify-center space-x-4">
          <img src="https://via.placeholder.com/40" alt="AMEX" />
          <img src="https://via.placeholder.com/40" alt="Discover" />
          <img src="https://via.placeholder.com/40" alt="MasterCard" />
          <img src="https://via.placeholder.com/40" alt="UnionPay" />
          <img src="https://via.placeholder.com/40" alt="Visa" />
        </div>

        {/* Dropdown Section */}
        <div className="flex space-x-4">
          {/* Currency Selector */}
          <select className="p-2 border rounded text-black">
            <option>Pakistan (PKR Rs)</option>
            <option>Australia (AUD $)</option>
            <option>France (EUR €)</option>
            <option>Germany (EUR €)</option>
            <option>Italy (EUR €)</option>
            <option>Qatar (QAR)</option>
            <option>Saudi Arabia (SAR)</option>
            <option>Spain (EUR €)</option>
            <option>Türkiye (EUR €)</option>
            <option>United Arab Emirates (AED)</option>
            <option>United Kingdom (GBP £)</option>
            <option>United States (USD $)</option>
          </select>

          {/* Language Selector */}
          <select className="p-2 border rounded text-black">
            <option>English</option>
            <option>Urdu</option>
          </select>
        </div>

        {/* Footer Copyright */}
      </div>
    </div>
  );
};

export default Footer;
