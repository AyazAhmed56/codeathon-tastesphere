import React, { useEffect, useState } from "react";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [personalInfo, setPersonalInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const vendorsPerPage = 6;

  useEffect(() => {
    fetch("/vendors.json")
      .then((response) => response.json())
      .then((data) => setVendors(data))
      .catch((error) => console.error("Error fetching vendors:", error));

    fetch("/personal.json")
      .then((response) => response.json())
      .then((data) => setPersonalInfo(data))
      .catch((error) => console.error("Error fetching personal info:", error));
  }, []);

  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = vendors.slice(indexOfFirstVendor, indexOfLastVendor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getVendorDetails = (vendor) => {
    const details = personalInfo.find((info) => info.name === vendor.name);
    return details || {};
  };

  return (
    <div
      className="min-h-screen bg-center bg-cover bg-no-repeat text-gray-800"
      style={{ backgroundImage: "url('/images/vendor-bg.jpg')" }}
    >
      <section id="vendors" className="py-12 px-4">
        <h2 className="text-4xl font-bold text-black mb-8 text-center">
          Local Food Vendors
        </h2>

        {selectedVendor ? (
          (() => {
            const vendorDetails = getVendorDetails(selectedVendor);
            return (
              <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-lg mx-auto">
                <h3 className="text-2xl font-bold text-gray-800">
                  {selectedVendor.name}
                </h3>
                <p className="text-gray-600 mt-2">
                  {selectedVendor.description}
                </p>
                <p className="text-gray-600 mt-2 font-semibold">
                  📍 {vendorDetails.address}
                </p>
                <p className="text-gray-600 mt-2 font-semibold">
                  🍽️ Speciality: {vendorDetails.speciality}
                </p>
                <p className="text-gray-600 mt-2 font-semibold">
                  ⏳ Experience: {vendorDetails.experience} years
                </p>
                <iframe
                  title="vendor-map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    vendorDetails.address
                  )}&output=embed`}
                  className="w-full h-64 mt-4 rounded-lg"
                  allowFullScreen
                ></iframe>
                <button
                  onClick={() => setSelectedVendor(null)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Back to List
                </button>
              </div>
            );
          })()
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentVendors.map((vendor, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  onClick={() => setSelectedVendor(vendor)}
                >
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

            <div className="flex justify-center mt-8">
              {Array.from(
                { length: Math.ceil(vendors.length / vendorsPerPage) },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`mx-1 px-4 py-2 rounded ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
