import React, { useState } from "react";
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

function Ingredients() {
  const [formData, setFormData] = useState({
    kind_id: "",
    name: "",
    descriptions: "",
    price: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setPreviewImage(reader.result); // Set the preview image
      };
      reader.readAsDataURL(file);
    } else if (e.target.name === "kind_id") {
      setFormData({ ...formData, kind_id: parseInt(e.target.value) });
    } else if (e.target.name === "price") {
      const priceValue = parseFloat(e.target.value);
      if (!isNaN(priceValue)) {
        setFormData({ ...formData, price: priceValue });
      }
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
        const response = await axios.post(
          "http://192.168.27.1:1407/admin/ingredients",
          {
            kind_id: formData.kind_id,
            name: formData.name,
            descriptions: formData.descriptions,
            price: formData.price,
            image: formData.image,
          }
        );
        if (response.status === 200) {
          alert("Ingredient added successfully!");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to add ingredient");
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
                <InputLabel id="kind-select-label">Select Kind</InputLabel>
                <Select
                  labelId="kind-select-label"
                  id="kind-select"
                  name="kind_id"
                  value={formData.kind_id}
                  onChange={handleChange}
                  label="Select Kind"
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="1">Thịt Heo</MenuItem>
                  <MenuItem value="2">Thịt Bò</MenuItem>
                  <MenuItem value="3">Thịt Gà</MenuItem>
                  <MenuItem value="4">Hải Sản</MenuItem>
                  <MenuItem value="5">Rau Củ</MenuItem>
                </Select>
                <FormHelperText>Select the type of ingredient</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descriptions"
                variant="outlined"
                name="descriptions"
                value={formData.descriptions}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                variant="outlined"
                name="price"
                type="number"
                value={formData.price}
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
                Add Ingredient
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default Ingredients;
