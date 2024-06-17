import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header/Header";
import HeaderSigned from "../../layouts/Header/HeaderSigned";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import Footer from "../../layouts/Footer/Footer";

import Comments from "../recipes/comment";

const RecipesDetail = () => {
  const [userData, setUserData] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://192.168.27.1:1407/home", {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (response.status === 200) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://192.168.27.1:1407/recipes/detail/${id}`
        );
        const processedRecipe = {
          ...response.data[0],
          recipe_img: replaceImagePath(response.data[0].recipe_img),
        };
        setRecipe(processedRecipe);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin công thức:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  const replaceImagePath = (imagePath) => {
    const serverAddress = "http://192.168.27.1:1407";
    const path = imagePath.split("/images/")[1];
    return `${serverAddress}/images/${path}`;
  };

  const handleBackClick = () => {
    // Quay lại trang trước đó trong lịch sử duyệt
    window.history.back();
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {userData ? <HeaderSigned /> : <Header />}
      <main style={{ padding: "20px" }}>
        {recipe && (
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
                image={recipe.recipe_img}
                alt={recipe.recipe_name}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  borderRadius: "26px",
                }}
              />
              <CardContent>
                <Typography
                  variant="h4"
                  component="div"
                  align="center"
                  gutterBottom
                >
                  {recipe.recipe_name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Nguyên liệu:</strong> {recipe.name},{" "}
                  {recipe.other_ingredients}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong
                    style={{
                      fontWeight: 800,
                      color: "#333",
                      display: "block",
                      marginTop: 20,
                    }}
                  >
                    Chi tiết công thức:
                  </strong>
                  {recipe.detail}
                </Typography>
              </CardContent>
            </Card>
            <Comments id={recipe.recipe_id} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RecipesDetail;
