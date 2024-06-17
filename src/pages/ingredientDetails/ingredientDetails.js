import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Rating,
  IconButton, // Thêm IconButton từ Material-UI
} from "@mui/material";

import Header from "../../layouts/Header/Header";
import HeaderSigned from "../../layouts/Header/HeaderSigned";
import Footer from "../../layouts/Footer/Footer";

import RatingComponent from "../ingredientDetails/rating";
import CommentComponent from "../ingredientDetails/comment";
import RecipesComponent from "../ingredientDetails/recipes";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"; // Thêm biểu tượng giỏ hàng từ Material-UI
import Snackbar from "../../components/SnackbarMsg";

const IngredientDetails = () => {
  const [ingredient, setIngredient] = useState(null);
  const [userData, setUserData] = useState(null);
  const { id } = useParams();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://192.168.27.1:1407/home`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        const response = await fetch(
          `http://192.168.27.1:1407/ingredients/details/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setIngredient({
            ...data,
            image: replaceImagePath(data.image),
          });
        }
      } catch (error) {
        console.error("Error fetching ingredient details:", error);
      }
    };
    fetchIngredient();
  }, [id]);

  const replaceImagePath = (imagePath) => {
    const serverAddress = "http://192.168.27.1:1407";
    const path = imagePath.split("/images/")[1];
    return `${serverAddress}/images/${path}`;
  };

  if (!ingredient) {
    return <CircularProgress />; // Show loading indicator while ingredient data is being fetched
  }

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
  return (
    <div style={{ minHeight: "100vh" }}>
      {userData ? <HeaderSigned /> : <Header />}

      <Grid style={{ margin: "25px auto", width: "70vw" }}>
        <Paper style={{ padding: 20, height: "400px", overflow: "hidden" }}>
          <img
            src={ingredient.image}
            alt={ingredient.name}
            style={{
              objectFit: "cover",
              width: "30%",
              marginTop: 15,
              borderRadius: 24,
            }}
          />
          <Typography
            variant="div"
            style={{ marginTop: 15, width: "66%", float: "right" }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontSize: "26px",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              {ingredient.name}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "grey",
                fontWeight: "bold",
                fontSize: "14px",
                textTransform: "uppercase",
                textAlign: "center",
                marginTop: "4px",
              }}
            >
              Nhà cung cấp: MeetDeli
            </Typography>
            <Typography style={{ marginTop: 10 }}>
              {ingredient.descriptions}
            </Typography>
            <Typography
              variant="div"
              style={{
                display: "block",
                marginTop: "24px",
                textAlign: "center",
                fontSize: 18,
              }}
            >
              {ingredient.rating === null ? (
                <p
                  style={{
                    color: "grey",
                  }}
                >
                  Chưa có đánh giá!
                </p>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                  }}
                >
                  <Rating
                    name="read-only"
                    value={ingredient.rating}
                    precision={0.5}
                    readOnly
                  />
                  <span
                    style={{
                      marginTop: 2,
                      fontSize: 14,
                      color: "grey",
                    }}
                  >
                    ( {ingredient.rating}/5 )
                  </span>
                </div>
              )}
            </Typography>

            <Typography
              variant="h6"
              style={{
                marginTop: 16,
                textAlign: "center",
                color: "red",
                fontSize: 24,
              }}
            >
              {parseFloat(ingredient.price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>

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
          </Typography>
        </Paper>

        <Paper
          style={{
            padding: 6,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "center",
            margin: "26px auto",
            width: "70vw",
          }}
        >
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            Đánh Giá
            <RatingComponent id={id} />
          </Typography>
        </Paper>
        <Snackbar isOpen={snackbarOpen} msg={snackbarMsg}></Snackbar>
      </Grid>

      <RecipesComponent ingredient_id={id} />
      <CommentComponent id={id} />
      <Footer />
    </div>
  );
};

export default IngredientDetails;
