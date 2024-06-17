import React, { useState } from "react";
import AddIngredients from "../ingredientsManager/ingredients-components/addIngredients";
import GetIngredients from "../ingredientsManager/ingredients-components/getIngredients";

const IngredientsManager = () => {
  const [showAddIngredients, setShowAddIngredients] = useState(false);

  const toggleComponent = () => {
    setShowAddIngredients(!showAddIngredients);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}> Ingredients Manager</h1>
      <button style={styles.button} onClick={toggleComponent}>
        {showAddIngredients ? "Show Ingredients" : "Add Ingredients"}
      </button>
      <div style={styles.componentContainer}>
        {showAddIngredients ? <AddIngredients /> : <GetIngredients />}
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
