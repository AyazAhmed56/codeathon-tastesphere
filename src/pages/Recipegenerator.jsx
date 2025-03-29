import React, { useState } from "react";
import RecipeCard from "../components/Recipecard";

const RecipeGeneration = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateRecipes = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=3&apiKey=414708959dba45f28ed1544713714af9`
      );
      if (!response.ok) {
        throw new Error("Failed to generate recipes.");
      }
      const data = await response.json();
      setRecipes(data.recipes);
    } catch (err) {
      setError(err.message || "An error occurred while generating recipes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={generateRecipes}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Generate Recipes
      </button>
      {loading && <p className="text-center text-blue-500 mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeGeneration;
