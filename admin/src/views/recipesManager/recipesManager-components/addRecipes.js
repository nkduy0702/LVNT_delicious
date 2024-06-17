import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

import { fetchIngredients } from "../../../service/recipesAPI/getIngredients";

function AddRecipes() {
  const [formData, setFormData] = useState({
    ingredient_id: "",
    other_ingredients: "",
    recipe_name: "",
    detail: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [ingredients, setIngredients] = useState(null);

  useEffect(() => {
    fetchIngredients().then((response) => {
      setIngredients(response);
    });
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setPreviewImage(reader.result); // Set the preview image
      };
      reader.readAsDataURL(file);
    } else if (e.target.name === "ingredient_id") {
      setFormData({ ...formData, ingredient_id: parseInt(e.target.value) });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleImageUploadClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.image == null) {
      alert("Please upload an Image");
    } else {
      try {
        console.log(formData);
        const response = await axios.post("http://192.168.27.1:1407/recipes", {
          ingredient_id: formData.ingredient_id,
          recipe_name: formData.recipe_name,
          other_ingredients: formData.other_ingredients,
          detail: formData.detail,
          image: formData.image,
        });
        if (response.status === 200) {
          alert("Recipe added successfully!");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to add recipe");
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          padding: "26px 14px",
          borderRadius: 4,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="select-main-ingredients">
                  Select Main Ingredients
                </InputLabel>
                <Select
                  labelId="select-main-ingredients"
                  id="select-main-ingredients"
                  name="ingredient_id"
                  value={formData.ingredient_id}
                  onChange={handleChange}
                  label="Select Main Ingredients"
                  required
                >
                  {ingredients?.map((ingredient) => (
                    <MenuItem key={ingredient.id} value={ingredient.id}>
                      {ingredient.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select ingredient's name</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Other Ingredients"
                variant="outlined"
                name="other_ingredients"
                value={formData.other_ingredients}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Recipe's name"
                variant="outlined"
                name="recipe_name"
                value={formData.recipe_name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Recipe's detail"
                variant="outlined"
                name="detail"
                value={formData.detail}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <input
                id="imageInput"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                style={{ display: "none" }}
              />
              <input
                type="hidden"
                value=""
                name="image" // Ensure "image" field is not empty when no image is selected
              />
              <IconButton
                onClick={handleImageUploadClick}
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ marginTop: 10, maxWidth: "100%", height: "auto" }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Add Recipe
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default AddRecipes;
