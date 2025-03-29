"use client";
import React, { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url(/images/background.jpg)" }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-lg"></div>

      {/* Auth Form */}
      <div className="relative bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-sm w-full text-white transition-all duration-500">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 mb-4 bg-white/10 rounded-lg border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 bg-white/10 rounded-lg border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 bg-white/10 rounded-lg border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg font-semibold hover:opacity-90 transition">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            className="text-yellow-300 cursor-pointer ml-2 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
