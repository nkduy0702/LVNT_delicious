import React, { useState } from "react";
import { Button, Box, AppBar, Toolbar } from "@mui/material";
import GetIngredients from "./getIngredients";
import BestSeller from "./bestSeller";
import SearchComponent from "../Search";

const Ingredients = () => {
  const [ingredient, setIngredient] = useState(1);

  const handleButtonClick = (id) => {
    setIngredient(id);
  };

  const renderNavbarOption = (id, label) => {
    return (
      <Button
        key={id}
        variant="text"
        color="inherit"
        onClick={() => handleButtonClick(id)}
        sx={{
          fontSize: 18,
          textTransform: "none",
          letterSpacing: "4px",
          marginRight: "10px",
          fontWeight: ingredient === id ? "bold" : "normal",
          color: ingredient === id ? "#FF5733" : "inherit", // Màu đỏ cam
          transition: "color 0.3s ease", // Hiệu ứng chuyển đổi màu
          "&:hover": {
            color: "#FF5733", // Màu đỏ cam khi di chuột qua
          },
        }}
      >
        {label}
      </Button>
    );
  };

  return (
    <Box>
      <AppBar
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "70vw",
          left: "15vw",
          background: "white!important",
          color: "#333333a3",
          borderRadius: "14px",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {renderNavbarOption(1, "Thịt Heo")}
          {renderNavbarOption(2, "Thịt Bò")}
          {renderNavbarOption(3, "Thịt Gà")}
          {renderNavbarOption(4, "Hải Sản")}
          {renderNavbarOption(5, "Rau củ")}
        </Toolbar>
      </AppBar>
      <SearchComponent />
      <Box sx={{ padding: "20px" }}>
        <GetIngredients kind_id={ingredient} />
      </Box>

      <Box sx={{ padding: "20px" }}>
        <BestSeller />
      </Box>
    </Box>
  );
};

export default Ingredients;
