import React from "react";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <a href={recipe.sourceUrl} className="cursor-pointer">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
      </a>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{recipe.title}</h3>
        <p className="text-gray-600 mt-2">{recipe.description}</p>
        <a
          href={recipe.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mt-4 block"
        >
          View Recipe
        </a>
      </div>
    </div>
  );
};

export default RecipeCard;
