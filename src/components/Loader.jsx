"use client";
import React, { useState, useEffect } from "react";

export default function Loader() {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [moveUp, setMoveUp] = useState(false);
  const words = ["Welcome", "To", "Taste-Sphere..."];

  // Background gradient colors based on words
  const backgroundColors = [
    "bg-gradient-to-r from-blue-200 to-white",
    "bg-gradient-to-r from-orange-300 to-pink-400",
    "bg-gradient-to-r from-purple-500 to-yellow-300",
  ];

  useEffect(() => {
    if (index < words.length - 1) {
      const timer = setTimeout(() => {
        setIndex(index + 1);
      }, 1000); // Change word every 1 second
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setMoveUp(true);
      }, 1000);

      setTimeout(() => {
        setLoading(false);
      }, 2000); // Hide after animation completes
    }
  }, [index]);

  if (!loading) return null; // Hide loader permanently

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-[999] transition-all duration-1000 ${
        moveUp ? "-translate-y-full opacity-0" : "opacity-100"
      } ${backgroundColors[index]}`}
    >
      <h1 className="text-[4vw] font-bold text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text animate-zoomIn">
        {words[index]}
      </h1>
    </div>
  );
}
