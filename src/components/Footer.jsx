import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600">
            © 2024 E-Commerce Admin. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-2 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
