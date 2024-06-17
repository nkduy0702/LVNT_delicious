import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import axios from "axios";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          "http://192.168.27.1:1407/ingredients/bestSeller"
        );
        if (response.status === 200) {
          setBestSellers(
            response.data.map((ingredient) => ({
              ...ingredient,
              image: replaceImagePath(ingredient.image),
            }))
          );
        } else {
          console.log("Lỗi server");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };
    fetchBestSeller();
  }, []);

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

  const nextBS = () => {
    const BSLength = bestSellers.length;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % BSLength);
  };

  const previousBS = () => {
    const BSLength = bestSellers.length;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + BSLength) % BSLength);
  };

  return (
    <div
      style={{
        padding: "30px 0 20px 0",
        width: "90%",
        margin: "0 auto",
        height: "100%",
        background: "linear-gradient(to right, #f33838, #fbac3f)",
        borderRadius: "36px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: 800,
          textTransform: "uppercase",
          color: "#fff",
          marginBottom: "40px",
          fontSize: "42px",
        }}
      >
        Best Sellers
      </Typography>
      <Grid container justifyContent="center" alignItems="center">
        <IconButton
          sx={{
            color: "#fff",
            marginRight: "10px",
            fontSize: "40px",
          }}
          onClick={previousBS}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <Card
          sx={{
            width: "60vw",
            height: "360px",
            borderRadius: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              to={"/ingredient/" + bestSellers[currentIndex]?.id}
              style={{
                display: "flex",
                alignItems: "center",
                height: "360px",
                textDecoration: "none",
                color: "#333",
              }}
            >
              <CardMedia
                component="img"
                height="200px"
                image={bestSellers[currentIndex]?.image}
                alt={bestSellers[currentIndex]?.name}
                sx={{
                  height: "100%",
                  padding: "20px",
                  borderRadius: "50px",
                  width: "unset !important",
                }}
              />
            </Link>
            <CardContent
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Typography
                gutterBottom
                variant="h2"
                component="div"
                sx={{
                  fontSize: "24px",
                  fontWeight: "800",
                  textAlign: "center",
                }}
              >
                {bestSellers[currentIndex]?.name}
              </Typography>

              {/* Mô tả sản phẩm */}
              <Typography
                variant="body2"
                color="text.primary"
                component="p"
                sx={{
                  color: "#999",
                  textAlign: "justify",
                  height: "100px",
                  marginTop: "20px",
                }}
              >
                {bestSellers[currentIndex]?.descriptions}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                component="div"
                sx={{
                  marginTop: "50px",
                  width: "100%",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "24px",
                  color: "red",
                  padding: "0 50px",
                }}
              >
                <Typography sx={{ fontSize: 18, fontWeight: 800 }}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(bestSellers[currentIndex]?.price)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ marginLeft: "auto", fontSize: 18, fontWeight: 800 }}
                >
                  500g
                </Typography>
              </Typography>
              <IconButton
                onClick={() => handleAddToCart(bestSellers[currentIndex])}
                sx={{
                  width: "50px",
                  height: "50px",
                  color: "#f33838c7",
                  display: "block",
                  "&:hover": {
                    color: "red",
                  },
                }}
              >
                <AddShoppingCartIcon />
              </IconButton>
            </CardContent>
          </div>
        </Card>
        <IconButton
          sx={{
            color: "#fff",
            marginLeft: "10px",
            fontSize: "40px",
          }}
          onClick={nextBS}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: "10px" }}
      >
        {bestSellers.map((ingredient, index) => (
          <IconButton key={index} onClick={() => setCurrentIndex(index)}>
            <img
              src={ingredient.image}
              alt={ingredient.name}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginRight: "10px",
                border:
                  index === currentIndex
                    ? "4px solid #fff"
                    : "2px solid transparent",
              }}
            />
          </IconButton>
        ))}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMsg}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  );
};

export default BestSellers;
