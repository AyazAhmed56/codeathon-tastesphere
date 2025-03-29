import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white py-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-8">
        {/* Logo Section */}
        <div className="flex items-center space-x-6">
          <img
            src="/taste sphere.jpg"
            alt="Taste Sphere"
            className="h-16 w-16 rounded-full object-cover"
          />
          <h1 className="text-3xl font-extrabold">Taste Sphere</h1>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-8 text-xl font-semibold">
            <li>
              <a
                href="/"
                className="hover:underline hover:text-yellow-300 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/recipe"
                className="hover:underline hover:text-yellow-300 transition"
              >
                Recipe
              </a>
            </li>
            <li>
              <a
                href="/vendors"
                className="hover:underline hover:text-yellow-300 transition"
              >
                Vendors
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="hover:underline hover:text-yellow-300 transition"
              >
                Login
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
