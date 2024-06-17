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

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [expandedDescription, setExpandedDescription] = useState({});

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          "http://192.168.27.1:1407/admin/ingredients"
        );
        setIngredients(
          response.data.map((ingredient) => ({
            ...ingredient,
            image: replaceImagePath(ingredient.image),
            price: formatPrice(ingredient.price),
          }))
        );
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch ingredients");
      }
    };

    fetchIngredients(); // Include fetchIngredients in dependency array
  }, []); // Empty dependency array

  // Hàm để thay đổi đường dẫn hình ảnh
  const replaceImagePath = (imagePath) => {
    const serverAddress = "http://192.168.27.1:1407"; // Thay đổi địa chỉ IP và cổng của máy chủ ReactJS
    const path = imagePath.split("/images/")[1]; // Lấy phần đường dẫn sau /images/
    return `${serverAddress}/images/${path}`;
  };

  // Hàm để định dạng giá thành VND
  const formatPrice = (price) => {
    return (
      new Intl.NumberFormat("vi-VN", {
        style: "decimal",
        currency: "VND",
      }).format(price) + " VND"
    );
  };

  // Hàm xóa nguyên liệu
  const deleteIngredient = async (id) => {
    try {
      const response = await axios.delete(
        `http://192.168.27.1:1407/admin/ingredients/${id}`
      );
      if (response.status === 200) {
        setIngredients(
          ingredients.filter((ingredient) => ingredient.id !== id)
        );
        alert("Ingredient deleted successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete ingredient");
    }
  };

  // Hàm kiểm tra độ dài của mô tả sản phẩm
  // Hàm kiểm tra độ dài của mô tả sản phẩm
  const renderDescription = (ingredient) => {
    if (
      ingredient.descriptions.split(" ").length > 20 &&
      !expandedDescription[ingredient.id]
    ) {
      return (
        <>
          {ingredient.descriptions.split(" ").slice(0, 25).join(" ")}
          <span>... </span>
          <Button
            color="primary"
            onClick={() =>
              setExpandedDescription({
                ...expandedDescription,
                [ingredient.id]: true,
              })
            }
            style={{
              height: "24px",
            }}
          >
            Xem thêm
          </Button>
        </>
      );
    } else if (expandedDescription[ingredient.id]) {
      return (
        <>
          {ingredient.descriptions}
          <Button
            color="primary"
            onClick={() =>
              setExpandedDescription({
                ...expandedDescription,
                [ingredient.id]: false,
              })
            }
            style={{
              padding: 0,
              fontSize: "14px",
              height: "14px!important",
            }}
          >
            Thu gọn
          </Button>
        </>
      );
    } else {
      return ingredient.descriptions;
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
                  Kind
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Description
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Price
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
            {ingredients.map((ingredient) => (
              <TableRow key={ingredient.id}>
                <TableCell
                  sx={{
                    fontFamily: "Arial, sans-serif", // Thay đổi font chữ ở đây
                  }}
                >
                  {ingredient.id}
                </TableCell>
                <TableCell
                  sx={{
                    width: "15%",
                    fontFamily: "Arial, sans-serif", // Thay đổi font chữ ở đây
                  }}
                >
                  {ingredient.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Arial, sans-serif", // Thay đổi font chữ ở đây
                  }}
                >
                  {ingredient.kindName}
                </TableCell>
                <TableCell
                  sx={{
                    width: "35%",
                    fontFamily: "Arial, sans-serif", // Thay đổi font chữ ở đây
                  }}
                >
                  {renderDescription(ingredient)}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Arial, sans-serif", // Thay đổi font chữ ở đây
                  }}
                >
                  {ingredient.price}
                </TableCell>
                <TableCell>
                  <img
                    src={ingredient.image}
                    alt={ingredient.name}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteIngredient(ingredient.id)}
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

export default Ingredients;
