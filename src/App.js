import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthForm from "./pages/Auth";
import Recipes from "./pages/Recipes.js";
import RecipesDetail from "./pages/recipes/RecipesDetail.js";
import Index from "./pages/Index";
import Home from "./pages/Home.js";
import Cart from "./pages/Cart.js";
import Payment from "./pages/payment/payment.js";
import IngrdientDetails from "./pages/ingredientDetails/ingredientDetails.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipesDetail />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shopping-cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/ingredient/:id" element={<IngrdientDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
