import React, { useEffect, useState } from "react";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState({});
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 4;

  useEffect(() => {
    fetch("/recipe.json") // Ensure recipe.json is in the public folder
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));

    fetch("/ingredients.json") // Fetching ingredients data
      .then((response) => response.json())
      .then((data) => setIngredients(data))
      .catch((error) => console.error("Error fetching ingredients:", error));
  }, []);

  // Pagination Logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <main className="py-12 px-4 max-w-screen-xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Recipes</h2>
        <p className="text-center text-lg text-gray-600 mb-8">
          Browse through traditional recipes from different cultures.
        </p>

        {/* Show Recipe Details if Selected */}
        {selectedRecipe ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="mb-4 text-blue-500 hover:underline"
            >
              ⬅ Back to Recipes
            </button>
            <h2 className="text-3xl font-bold">{selectedRecipe.title}</h2>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              className="w-full h-64 object-cover rounded-lg mt-4"
            />
            <p className="text-gray-700 mt-4">{selectedRecipe.description}</p>
            <h3 className="text-xl font-bold mt-4">Ingredients:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {ingredients[selectedRecipe.title] &&
              Array.isArray(ingredients[selectedRecipe.title]) ? (
                ingredients[selectedRecipe.title].map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <li>No ingredients found.</li>
              )}
            </ul>
          </div>
        ) : (
          <>
            {/* Recipe Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {currentRecipes.map((recipe, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <h3 className="mt-4 text-2xl font-bold">{recipe.title}</h3>
                  <p className="text-gray-600 mt-2">{recipe.description}</p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              {Array.from({
                length: Math.ceil(recipes.length / recipesPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`mx-2 px-4 py-2 rounded ${
                    currentPage === index + 1
                      ? "bg-orange-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
