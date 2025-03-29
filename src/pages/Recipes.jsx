import React from "react";

export default function Recipes() {
  const recipeList = [
    {
      title: "Classic Lasagna",
      image: "/images/lasagna.jpg",
      description:
        "A hearty Italian classic with layers of cheese, sauce, and pasta.",
    },
    {
      title: "Chicken Tikka Masala",
      image: "/images/chicken-tikka.jpg",
      description:
        "A flavorful, creamy Indian dish made with spiced grilled chicken.",
    },
    {
      title: "Vegetarian Sushi Rolls",
      image: "/images/sushi.jpg",
      description:
        "Fresh and healthy sushi rolls with avocado, cucumber, and carrots.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Main Section */}
      <main className="py-12 px-4 max-w-screen-xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">
          Authentic Recipes
        </h2>
        <p className="text-center text-lg text-gray-600 mb-8">
          Browse through traditional recipes from different cultures.
        </p>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipeList.map((recipe, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 className="mt-4 text-2xl font-bold">{recipe.title}</h3>
              <p className="text-gray-600 mt-2">{recipe.description}</p>
              <a
                href="#"
                className="mt-4 inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 px-4 rounded"
              >
                View Recipe
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
