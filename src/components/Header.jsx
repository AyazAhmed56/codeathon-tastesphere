import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Taste Spherecd</h1>
        <nav>
          <ul className="flex space-x-6">
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
