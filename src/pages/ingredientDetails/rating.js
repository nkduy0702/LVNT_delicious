import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { Typography } from "@mui/material";

export default function BasicRating(props) {
  const [value, setValue] = useState(0);
  const [rateState, setRateState] = useState(false);
  const [userData, setUserData] = useState(null);

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
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        if (userData) {
          const params = {
            userid: userData.id,
            ingredientid: props.id,
          };
          const queryString = new URLSearchParams(params).toString();
          const apiUrl = `http://192.168.27.1:1407/rating/data?${queryString}`;
          const response = await fetch(apiUrl);

          if (response.status === 200) {
            const data = await response.json();
            setRateState(data !== null);
            setValue(data || 0);
          }
        }
      } catch (error) {
        console.error("Error fetching rating data:", error);
      }
    };
    fetchRate();
  }, [userData, props.id]);

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRating = async () => {
    if (!userData) {
      alert("Vui lòng đăng nhập trước!");
      return;
    }
    if (value === 0) {
      alert("Vui lòng chọn mức độ đánh giá ( >0 )");
      return;
    }

    try {
      const response = await axios.post(`http://192.168.27.1:1407/rating`, {
        rating: value,
        id: parseInt(props.id),
        userid: userData.id,
      });

      if (response.status === 200) {
        alert("Đánh giá thành công!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error rating:", error);
    }
  };

  return (
    <Box
      sx={{
        margin: "15px auto",
        width: "50vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      {!rateState ? (
        <>
          <Rating
            sx={{ fontSize: 36 }}
            name="rating"
            value={value}
            onChange={handleRatingChange}
          />
          <Button
            variant="outlined"
            sx={{
              marginTop: 3,
              marginLeft: 2,
              borderColor: "grey!important",
              color: "#333",
              "&:hover": {
                backgroundColor: "#faaf00 !important",
                borderColor: "#fff !important",
                color: "#fff",
              },
            }}
            onClick={handleRating}
          >
            Đánh giá
          </Button>
        </>
      ) : (
        <>
          <Rating sx={{ fontSize: 36 }} name="rating" value={value} readOnly />
          <Typography style={{ fontSize: 16, marginTop: 20 }}>
            Bạn đã đánh giá!
          </Typography>
        </>
      )}
    </Box>
  );
}
