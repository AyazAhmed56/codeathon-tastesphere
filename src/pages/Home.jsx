import React from "react";
import InputForm from "../components/InputForm";
import RecipeCard from "../components/Recipecard";

const Home = ({ fetchRecipes, recipes, loading, error }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <InputForm onSearch={fetchRecipes} />
      {loading && <p className="text-center text-blue-500 mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      {!recipes.length && (
        <div>
          <img src="/images/recepie.jpg" height={200} alt="Recipe" />
        </div>
      )}
    </div>
  );
};

export default Home;
