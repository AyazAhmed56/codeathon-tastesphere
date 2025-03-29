import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RecipeDetails from "./pages/Recipedetails";
import RecipeGeneration from "./pages/Recipegenerator";
import SavedRecipe from "./pages/Savedrecipes";
import Vendors from "./pages/Vendors";
import Recipes from "./pages/Recipes";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecipes = async (query) => {
    setLoading(true);
    setError("");
    setRecipes([]);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=414708959dba45f28ed1544713714af9`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipes.");
      }
      const data = await response.json();
      setRecipes(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  fetchRecipes={fetchRecipes}
                  recipes={recipes}
                  loading={loading}
                  error={error}
                />
              }
            />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/generate" element={<RecipeGeneration />} />
            <Route path="/saved" element={<SavedRecipe />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/recipe" element={<Recipes />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
