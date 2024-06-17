import React, { useEffect, useState } from "react";
import Header from "../layouts/Header/Header";
import HeaderSigned from "../layouts/Header/HeaderSigned";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import Footer from "../layouts/Footer/Footer";

const Recipes = () => {
  const [userData, setUserData] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://192.168.27.1:1407/home", {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://192.168.27.1:1407/recipes");
        const processedRecipes = response.data.map((recipe) => ({
          ...recipe,
          recipe_img: replaceImagePath(recipe.recipe_img),
        }));
        setRecipes(processedRecipes);
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch recipes");
      }
    };

    fetchRecipes();
  }, []);

  const replaceImagePath = (imagePath) => {
    const serverAddress = "http://192.168.27.1:1407";
    const path = imagePath.split("/images/")[1];
    return `${serverAddress}/images/${path}`;
  };

  const handleBackClick = () => {
    setSelectedRecipe(null);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {userData ? <HeaderSigned /> : <Header />}
      <main style={{ padding: "20px" }}>
        {selectedRecipe ? (
          <div style={{ width: "60vw", margin: "0 auto" }}>
            <Button
              variant="outlined"
              onClick={handleBackClick}
              style={{ marginBottom: "20px" }}
            >
              Quay lại
            </Button>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={selectedRecipe.recipe_img}
                alt={selectedRecipe.recipe_name}
                style={{
                  objectFit: "cover",
                  width: "50%",
                  margin: "12px auto",
                  borderRadius: "26px",
                }}
              />
              <CardContent>
                <Typography
                  variant="h4"
                  component="div"
                  gutterBottom
                  sx={{
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  {selectedRecipe.recipe_name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Nguyên liệu:</strong> {selectedRecipe.name},{" "}
                  {selectedRecipe.other_ingredients}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: 16 }}
                >
                  <strong
                    style={{ fontWeight: 800, color: "#333", marginBottom: 14 }}
                  >
                    Chi tiết công thức:
                  </strong>
                  {selectedRecipe.detail}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Grid
            container
            spacing={3}
            sx={{
              width: "80vw",
              margin: "0 auto",
            }}
          >
            {recipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe.recipe_id}>
                <Card
                  sx={{
                    height: 440,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={recipe.recipe_img}
                    alt={recipe.recipe_name}
                    style={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                      {recipe.recipe_name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{
                        height: 100,
                      }}
                    >
                      Nguyên liệu: {recipe.name}, {recipe.other_ingredients}
                    </Typography>
                    <Button
                      variant="outlined"
                      style={{ marginTop: "10px", textDecoration: "none" }}
                    >
                      <Link
                        to={"/recipes/" + recipe.recipe_id}
                        style={{ color: "blue", textDecoration: "none" }}
                      >
                        Xem chi tiết
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Recipes;
