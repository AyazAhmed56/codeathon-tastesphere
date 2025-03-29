import React, { useEffect, useState } from "react";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 4;
  const platformFeeRate = 0.05;

  useEffect(() => {
    fetch("/recipe.json")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (recipe) => {
    setCart((prevCart) => [...prevCart, recipe]);
  };

  const handleRemoveFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
  const platformFee = totalAmount * platformFeeRate;
  const finalAmount = totalAmount + platformFee;

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <main className="py-12 px-4 max-w-screen-xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Recipes</h2>
        <p className="text-center text-lg text-gray-600 mb-8">
          Browse through traditional recipes from different cultures.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {currentRecipes.map((recipe, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 cursor-pointer"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 className="mt-4 text-2xl font-bold">{recipe.title}</h3>
              <p className="text-gray-600 mt-2">{recipe.description}</p>
              <p className="mt-2 text-green-600 font-bold">
                ${recipe.price.toFixed(2)}
              </p>
              <button
                onClick={() => handleAddToCart(recipe)}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

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
      </main>

      {/* Cart Section */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg p-4 rounded-lg w-64">
          <h3 className="text-lg font-bold">Shopping Cart</h3>
          <ul className="mt-2 max-h-48 overflow-y-auto">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b py-2"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-10 h-10 rounded-lg"
                />
                <div className="flex-grow ml-2">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-gray-600">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(index)}
                  className="text-red-500 text-sm font-bold"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-semibold">
            Subtotal: ${totalAmount.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">
            Platform Fee (5%): ${platformFee.toFixed(2)}
          </p>
          <p className="text-lg font-bold mt-2">
            Total: ${finalAmount.toFixed(2)}
          </p>
          <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
