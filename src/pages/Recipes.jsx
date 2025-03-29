import React, { useEffect, useState } from "react";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState({});
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderingRecipe, setOrderingRecipe] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const recipesPerPage = 4;

  useEffect(() => {
    fetch("/recipe.json")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));

    fetch("/ingredients.json")
      .then((response) => response.json())
      .then((data) => setIngredients(data))
      .catch((error) => console.error("Error fetching ingredients:", error));
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleOrderClick = (recipe) => {
    setOrderingRecipe(recipe);
    setShowPayment(false);
    setOrderSuccess(false);
    setQuantity(1);
  };

  const handlePlaceOrder = () => {
    setShowPayment(true);
  };

  const handlePayment = (method) => {
    setOrderSuccess(true);
    setShowPayment(false);
    setTimeout(() => {
      setOrderingRecipe(null);
      setOrderSuccess(false);
    }, 2000);
  };

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
          </div>
        ) : (
          <>
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
                  <button
                    onClick={() => handleOrderClick(recipe)}
                    className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                  >
                    Order
                  </button>
                </div>
              ))}
            </div>

            {orderingRecipe && (
              <div className="fixed inset-0 flex items-center justify-center bg- bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-xl font-bold text-center">
                    Order: {orderingRecipe.title}
                  </h2>
                  {!showPayment && !orderSuccess && (
                    <>
                      <div className="mt-4 flex justify-center">
                        <button
                          onClick={() =>
                            setQuantity(quantity > 1 ? quantity - 1 : 1)
                          }
                          className="px-4 py-2 bg-gray-300 rounded-l-lg"
                        >
                          -
                        </button>
                        <span className="px-6 py-2 bg-gray-100 text-lg">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-4 py-2 bg-gray-300 rounded-r-lg"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={handlePlaceOrder}
                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                      >
                        Place Order
                      </button>
                    </>
                  )}
                  {showPayment && (
                    <>
                      <h3 className="text-lg text-center mt-4">
                        Select Payment Mode:
                      </h3>
                      <button
                        onClick={() => handlePayment("cod")}
                        className="mt-2 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
                      >
                        Cash on Delivery
                      </button>
                      <button
                        onClick={() => handlePayment("razorpay")}
                        className="mt-2 w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
                      >
                        Pay with Razorpay
                      </button>
                    </>
                  )}
                  {orderSuccess && (
                    <h3 className="text-green-600 text-center font-bold mt-4">
                      Order Successful! 🎉
                    </h3>
                  )}
                </div>
              </div>
            )}

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
