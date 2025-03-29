import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=414708959dba45f28ed1544713714af9`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipe details.");
        }
        const data = await response.json();
        console.log(data);
        setRecipe(data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching the recipe.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading)
    return <p className="text-center text-blue-500 mt-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  return recipe ? (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full rounded-lg"
      />
      <div className="mt-6">
        <p className="text-lg text-gray-700">
          {recipe.summary.replace(/<[^>]+>/g, "")}
        </p>
        <h2 className="text-2xl font-bold mt-6">Ingredients</h2>
        <ul className="list-disc list-inside mt-2">
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id} className="text-gray-700">
              {ingredient.original}
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : null;
};

export default RecipeDetails;
