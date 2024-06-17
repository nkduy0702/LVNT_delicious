import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  IconButton,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import axios from "axios";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Snackbar from "../components/SnackbarMsg";

const SearchComponent = () => {
  const [userData, setUserData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [ingredients, setIngredients] = useState(null);
  const [haveKey, setHaveKey] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://192.168.27.1:1407/home", {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchData();
  }, []);

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
          setSnackbarMsg("Đã thêm vào giỏ hàng thành công!");
        } else {
          console.log("Yêu cầu không thành công");
        }
      } catch (error) {
        console.error("Lỗi:", error);
      }
    } else {
      setSnackbarOpen(true);
      setSnackbarMsg("Vui lòng đăng nhập để thực hiện chức năng này");
    }
  };

  const handleSearchSubmit = async () => {
    if (searchTerm === "") {
      setHaveKey(false);

      return;
    } else {
      setHaveKey(true);
      try {
        const response = await axios.post(
          `http://192.168.27.1:1407/ingredients/search`,
          { searchTerm }
        );

        if (response.status === 200) {
          const { data } = response;
          setIngredients(
            data.map((ingredient) => ({
              ...ingredient,
              image: replaceImagePath(ingredient.image),
            }))
          );
        }
      } catch (error) {
        console.error("Lỗi:", error);
        alert("Không thể tải danh sách nguyên liệu");
      }
    }
  };

  const replaceImagePath = (imagePath) => {
    const serverAddress = "http://192.168.27.1:1407";
    const path = imagePath.split("/images/")[1];
    return `${serverAddress}/images/${path}`;
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          padding: "12px 0 28px 0",
          overflow: "hidden",
          paddingTop: "20px",
        }}
      >
        <TextField
          label="Tìm Kiếm"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearchSubmit}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ width: "60%", marginLeft: "20%" }}
        />
      </div>
      {ingredients != null && ingredients?.length > 0 ? (
        <Grid
          container
          spacing={4}
          sx={{
            width: "80vw",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 12,
            borderBottom: "1px solid grey",
          }}
        >
          {ingredients?.map((ingredient) => (
            <Grid
              item
              key={ingredient.id}
              sx={{
                cursor: "pointer",
                transition: "all 0.5s ease",
                "&:hover": { transform: "scale(1.03)" },
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
                    color: "#f33838c7!important",
                    margin: "0 auto",
                    display: "block",
                    "&:hover": { color: "red!important" },
                  }}
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}
          <Snackbar isOpen={snackbarOpen} msg={snackbarMsg}></Snackbar>
        </Grid>
      ) : (
        <div>
          {ingredients?.length === 0 && haveKey === true ? (
            <h3 style={{ textAlign: "center", marginTop: "12px" }}>
              Không có kết quả phù hợp!
            </h3>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
