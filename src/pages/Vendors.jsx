import React, { useEffect, useState } from "react";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetch("/vendors.json") // Make sure vendors.json is in the public folder
      .then((response) => response.json())
      .then((data) => setVendors(data))
      .catch((error) => console.error("Error fetching vendors:", error));
  }, []);

  return (
    <div
      className="min-h-screen bg-center bg-cover bg-no-repeat text-gray-800"
      style={{ backgroundImage: "url('/images/vendor-bg.jpg')" }}
    >
      <section id="vendors" className="py-12 px-4">
        <h2 className="text-4xl font-bold text-black mb-8 text-center">
          Local Food Vendors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={vendor.image}
                alt={vendor.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-800">
                {vendor.name}
              </h3>
              <p className="text-gray-600 mt-2">{vendor.description}</p>
              <p className="text-yellow-500 mt-2 font-semibold">
                ⭐ {vendor.reviews} Reviews
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
