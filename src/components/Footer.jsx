import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-3">
      <div className="container mx-auto text-center flex justify-between">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Recipe Finder. All Rights Reserved.
        </p>
        <p className="text-sm">
          Built with ❤️ using React and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
