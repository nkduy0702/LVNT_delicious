import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
} from "@mui/material";

const Recipes = (props) => {
  const [recipes, setRecipes] = useState(null);
  const [showAllRecipes, setShowAllRecipes] = useState(false);
  const initialRecipesCount = 3; // Số lượng công thức ban đầu hiển thị

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `http://192.168.27.1:1407/recipes/${props.ingredient_id}`
        );
        const modifiedRecipes = response.data.map((recipe) => ({
          ...recipe,
          recipe_img: replaceImagePath(recipe.recipe_img),
        }));
        setRecipes(modifiedRecipes);
      } catch (error) {
        console.error("Lỗi: ", error);
      }
    };
    fetchRecipes();
  }, [props.ingredient_id]);

  const replaceImagePath = (imagePath) => {
    const serverAddress = "http://192.168.27.1:1407";
    const path = imagePath.split("/images/")[1];
    return `${serverAddress}/images/${path}`;
  };

  const handleShowMoreRecipes = () => {
    setShowAllRecipes(true);
  };

  const handleShowLessRecipes = () => {
    setShowAllRecipes(false);
  };

  const visibleRecipes = showAllRecipes
    ? recipes
    : recipes && recipes.slice(0, initialRecipesCount);

  return (
    <div style={{ width: "70vw", margin: "0 auto" }}>
      {recipes?.length > 0 && (
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: 800, marginBottom: 2 }}
        >
          Các công thức gợi ý
        </Typography>
      )}
      <Grid container spacing={3}>
        {visibleRecipes &&
          visibleRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.recipe_id}>
              <Link
                to={"/recipes/" + recipe.recipe_id}
                style={{
                  textDecoration: "none",
                }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    height: "165px",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={recipe.name}
                    image={recipe.recipe_img}
                    sx={{
                      width: "165px",
                    }}
                  />
                  <CardContent
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h8"
                      sx={{
                        fontWeight: 800,
                      }}
                    >
                      {recipe.recipe_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: 13,
                      }}
                    >
                      {recipe.other_ingredients}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
      </Grid>
      {recipes && recipes.length > initialRecipesCount && !showAllRecipes && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Button variant="contained" onClick={handleShowMoreRecipes}>
            Xem thêm
          </Button>
        </div>
      )}
      {showAllRecipes && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Button variant="contained" onClick={handleShowLessRecipes}>
            Ẩn bớt
          </Button>
        </div>
      )}
    </div>
  );
};

export default Recipes;
