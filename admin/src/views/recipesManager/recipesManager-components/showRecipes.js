import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://192.168.27.1:1407/recipes");
        console.log(response.data);
        setRecipes(
          response.data.map((recipe) => ({
            ...recipe,
            recipe_img: replaceImagePath(recipe.recipe_img),
          }))
        );
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch recipes");
      }
    };

    fetchRecipes(); // Include fetchIngredients in dependency array
  }, []); // Empty dependency array

  // Hàm để thay đổi đường dẫn hình ảnh
  const replaceImagePath = (imagePath) => {
    const serverAddress = "http://192.168.27.1:1407"; // Thay đổi địa chỉ IP và cổng của máy chủ ReactJS
    const path = imagePath.split("/images/")[1]; // Lấy phần đường dẫn sau /images/
    console.log(`${serverAddress}/images/${path}`);
    return `${serverAddress}/images/${path}`;
  };

  // Hàm xóa công thức
  const deleteRecipe = async (id) => {
    try {
      console.log(id);
      const response = await axios.delete(
        `http://192.168.27.1:1407/recipes/${id}`
      );
      if (response.status === 200) {
        setRecipes(recipes.filter((recipe) => recipe.recipe_id !== id));
        alert(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete recipe");
    }
  };

  return (
    <div
      style={{
        border: "1px solid lightgrey",
        borderRadius: 8,
      }}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              textAlign: "center",
              fontWeight: "900",
              // textTransform: "uppercase",
              color: "red",
            }}
          >
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Main Ingredient
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Other Ingredients
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Detail
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Image
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.map((recipe) => (
              <TableRow key={recipe.recipe_id}>
                <TableCell
                  sx={{
                    fontFamily: "Arial, sans-serif", // Thay đổi font chữ ở đây
                  }}
                >
                  {recipe.recipe_id}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Arial, sans-serif", // Thay đổi font chữ ở đây
                  }}
                >
                  {recipe.recipe_name}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Arial, sans-serif", // Thay đổi font chữ ở đây
                  }}
                >
                  {recipe.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Arial, sans-serif", // Thay đổi font chữ ở đây
                  }}
                >
                  {recipe.other_ingredients}
                </TableCell>
                <TableCell
                  sx={{
                    width: "35%",
                    fontFamily: "Arial, sans-serif", // Thay đổi font chữ ở đây
                  }}
                >
                  {recipe.detail}
                </TableCell>
                <TableCell>
                  <img
                    src={recipe.recipe_img}
                    alt={recipe.recipe_name}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteRecipe(recipe.recipe_id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Recipes;
