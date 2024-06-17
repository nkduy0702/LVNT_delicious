import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton, // Thêm IconButton từ Material-UI
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"; // Thêm biểu tượng giỏ hàng từ Material-UI
import Snackbar from "../SnackbarMsg";

function Ingredients({ kind_id }) {
  const [ingredients, setIngredients] = useState([]);
  const [userData, setUserData] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

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
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          `http://192.168.27.1:1407/ingredients/${kind_id}`
        );
        setIngredients(
          response.data.map((ingredient) => ({
            ...ingredient,
            image: replaceImagePath(ingredient.image),
          }))
        );
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch ingredients");
      }
    };

    fetchIngredients();
  }, [kind_id]);

  const replaceImagePath = (imagePath) => {
    const serverAddress = "http://192.168.27.1:1407";
    const path = imagePath.split("/images/")[1];
    return `${serverAddress}/images/${path}`;
  };

  const handleAddToCart = async (ingredient) => {
    if (userData != null) {
      try {
        const userId = userData.id;
        const response = await axios.post(`http://192.168.27.1:1407/cart/add`, {
          userId,
          ingredient,
        });
        if (response.status === 200) {
          setSnackbarOpen(true);
          setSnackbarMsg("Thêm vào giỏ hàng thành công!");
        } else {
          console.log("NOT OK");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setSnackbarOpen(true);
      setSnackbarMsg("Vui lòng đăng nhập để thực hiện chức năng này");
    }
  };

  useEffect(() => {
    let timeout;
    if (snackbarOpen) {
      timeout = setTimeout(() => {
        setSnackbarOpen(false);
      }, 1000); // Đóng snackbar sau 1 giây
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [snackbarOpen]);

  return (
    <Grid
      container
      spacing={4}
      sx={{
        width: "80vw",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {ingredients.map((ingredient) => (
        <Grid
          item
          key={ingredient.id}
          sx={{
            cursor: "pointer",
            transition: "all 0.5s ease",
            "&:hover": {
              transform: "scale(1.03)",
            },
          }}
        >
          <Card sx={{ width: 180, background: "#cfcece1a" }}>
            <Link
              to={"/ingredient/" + ingredient.id}
              style={{
                textDecoration: "none",
                color: "#333",
                display: "block",
                padding: "0",
              }}
            >
              <CardMedia
                component="img"
                width="120px"
                height="150px"
                image={ingredient.image}
                alt={ingredient.name}
                sx={{
                  padding: "12px",
                  borderRadius: "36px",
                  objectFit: "cover",
                }}
              />
              <CardContent
                sx={{
                  maxHeight: 120,
                  padding: "0 12px",
                  paddingBottom: "unset !important",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h2"
                  component="div"
                  sx={{
                    textAlign: "center",
                    width: "100%",
                    height: 60,
                    fontSize: "16px",
                    fontWeight: "800",
                  }}
                >
                  {ingredient.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="div"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(ingredient.price)}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginLeft: "auto", color: "#999" }}
                  >
                    500g
                  </Typography>
                </Typography>
              </CardContent>
            </Link>
            <IconButton
              onClick={() => handleAddToCart(ingredient)}
              sx={{
                color: "green!important",
                margin: "0 auto",
                display: "block",
                "&:hover": {
                  color: "lightgreen!important",
                },
              }}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </Card>
        </Grid>
      ))}
      <Snackbar isOpen={snackbarOpen} msg={snackbarMsg}></Snackbar>
    </Grid>
  );
}

export default Ingredients;
