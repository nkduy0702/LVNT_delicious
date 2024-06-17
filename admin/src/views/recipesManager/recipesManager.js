import React, { useState } from "react";
import AddRecipes from "../recipesManager/recipesManager-components/addRecipes";
import ShowRecipes from "../recipesManager/recipesManager-components/showRecipes";

const IngredientsManager = () => {
  const [showAddRecipes, setShowAddRecipes] = useState(false);

  const toggleComponent = () => {
    setShowAddRecipes(!showAddRecipes);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}> Recipes Manager</h1>
      <button style={styles.button} onClick={toggleComponent}>
        {showAddRecipes ? "Show Recipes" : "Add Recipes"}
      </button>
      <div style={styles.componentContainer}>
        {showAddRecipes ? <AddRecipes /> : <ShowRecipes />}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    margin: "-18px auto",
    maxWidth: "70vw",
  },
  heading: {
    fontFamily: "Arial, sans-serif", // Thay đổi font chữ ở đây
    fontSize: 26,
    textAlign: "center",
    margin: "-26px 0 14px 0",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: 5,
    cursor: "pointer",
    fontSize: 16,
  },
  componentContainer: {
    marginTop: 30,
  },
};

export default IngredientsManager;
