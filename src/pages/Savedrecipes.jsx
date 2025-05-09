import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SavedRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    console.log(recipes);
    setSavedRecipes(recipes);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Saved Recipes</h1>
      {savedRecipes.length === 0 ? (
        <p className="text-gray-700">No recipes saved yet!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {recipe.title}
                </h3>

                {/* Use internal navigation instead of external link */}
                <a
                  href={recipe.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-4 block cursor-pointer"
                >
                  View Recipe
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipe;
