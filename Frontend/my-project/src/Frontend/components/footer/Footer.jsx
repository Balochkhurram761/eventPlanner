import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#111] text-gray-300 pt-14 pb-6 ">
      <div className="w-[88%] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 justify-items-center gap-12 text-center md:text-left">
        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-4 tracking-wide">
            WebEvent
          </h2>
          <p className="text-sm leading-6 text-gray-400 max-w-xs mx-auto md:mx-0">
            WebEvent.pk is Pakistan’s #1 Event Planning Portal & Mobile App.
            Find venues, wedding vendors, packages, and reviews all in one
            place. Get instant quotes, explore packages, create checklists, and
            plan your event stress-free.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-5">Quick Links</h3>
          <ul className="space-y-3">
            {["Home", "About", "Services", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="relative hover:text-[#94624b] transition duration-300 before:content-[''] before:absolute before:w-0 before:h-[2px] before:bg-[#94624b] before:-bottom-1 before:left-0 hover:before:w-full before:transition-all"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-5">Services</h3>
          <ul className="space-y-3">
            {["Catering", "Hall Booking", "Photography", "DJ Services"].map(
              (service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="relative hover:text-[#94624b] transition duration-300 before:content-[''] before:absolute before:w-0 before:h-[2px] before:bg-[#94624b] before:-bottom-1 before:left-0 hover:before:w-full before:transition-all"
                  >
                    {service}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-5">Contact Us</h3>
          <p className="text-sm text-gray-400 leading-6">
            Contact us to Get Best Deals
            <br />
            <span className="text-[#94624b]">vendor@webEvent.pk</span>
            <br />
            <span className="text-[#94624b]">info@webEvent.pk</span>
            <br />
            <span className="text-[#94624b]">0305-4372019</span>
          </p>
          <div className="mt-4 space-y-2">
            <a
              href="#"
              className="block bg-[#94624b] text-white py-2 px-4 rounded-md hover:bg-[#7a4e39] transition"
            >
              Get a Best Quote
            </a>
            <a
              href="#"
              className="block bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-[#94624b] transition"
            >
              Register as Vendor
            </a>
          </div>
        </div>

        {/* Social Media + App Store */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-5">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4 text-xl mb-5">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedin].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-[#94624b] hover:to-[#f8d7a4] text-white transition-all duration-300 shadow-md"
                >
                  <Icon />
                </a>
              )
            )}
          </div>

          {/* Store Badges */}
          <div className="flex justify-center md:justify-start gap-3">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-12"
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="h-12"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500 space-y-2">
        <p>© {new Date().getFullYear()} WebEvent. All rights reserved.</p>
        <p className="text-[#94624b]">Made with ❤️ by FYP Team</p>
      </div>
    </footer>
  );
};

export default Footer;
