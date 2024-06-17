import React, { useState, useEffect, useCallback } from "react";
import Header from "../layouts/Header/Header";
import Footer from "../layouts/Footer/Footer";
import HeaderSigned from "../layouts/Header/HeaderSigned";
import LocalMallIcon from "@mui/icons-material/LocalMall";

import axios from "axios";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  CardMedia,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchCartItems = useCallback(async (userId) => {
    try {
      const response = await axios.get(
        `http://192.168.27.1:1407/cart/${userId}`
      );
      const items = response.data.map((cart) => ({
        ...cart,
        total: parseFloat(cart.total),
        image: replaceImagePath(cart.image),
      }));
      setTotalAmount(calculateTotalAmount(items));
      console.log(items);
      setCartItems(items);
    } catch (error) {
      console.error("Lỗi khi tải danh sách mặt hàng trong giỏ hàng:", error);
    }
  }, []);

  const calculateTotalAmount = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.total;
    });
    console.log(total);
    total = total.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return total;
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
        if (response.status === 200) {
          const data = await response.json();
          setUserData(data);
          fetchCartItems(data.id); // Tải danh sách mặt hàng sau khi lấy thông tin người dùng
        } else {
          alert("Vui lòng đăng nhập để thực hiện chức năng này!");
          window.location.href = "/auth";
        }
      } catch (error) {
        alert("Vui lòng đăng nhập để thực hiện chức năng này!");
        window.location.href = "./auth";
      }
    };

    fetchData();
  }, [fetchCartItems]);

  const handleRemoveItem = async (cartItemId) => {
    const cart_id = parseInt(cartItemId);
    try {
      const response = await axios.delete(`http://192.168.27.1:1407/cart`, {
        data: { cart_id }, // Gửi dữ liệu dưới dạng object
      });
      if (response.status === 200) {
        alert("Đã xóa mặt hàng thành công!");
        fetchCartItems(userData.id); // Tải danh sách mặt hàng sau khi xóa một mặt hàng
      }
    } catch (error) {
      console.error("Lỗi khi xóa mặt hàng trong giỏ hàng:", error);
    }
  };

  const handleQuantityChange = async (
    cartItemId,
    currentQuantity,
    price,
    action
  ) => {
    const cart_id = parseInt(cartItemId);
    let newQuantity;
    let newTotal;

    if (action === "add") {
      newQuantity = currentQuantity + 1;
      newTotal = price * newQuantity;
    } else {
      newQuantity = currentQuantity - 1;
      newTotal = price * newQuantity;
    }

    try {
      const response = await axios.put(
        `http://192.168.27.1:1407/cart/modifier`,
        {
          cart_id,
          newQuantity,
          newTotal,
        }
      );
      if (response.status === 201) {
        fetchCartItems(userData.id); // Cập nhật số lượng trong giao diện người dùng
      }
    } catch (error) {
      console.error(
        "Lỗi khi cập nhật số lượng mặt hàng trong giỏ hàng:",
        error
      );
    }
  };

  const replaceImagePath = (imagePath) => {
    const serverAddress = "http://192.168.27.1:1407";
    const path = imagePath.split("/images/")[1];
    return `${serverAddress}/images/${path}`;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {userData ? <HeaderSigned /> : <Header />}
      <main style={{ flex: "1 0 auto" }}>
        {/* Hiển thị giỏ hàng */}

        <Container
          style={{
            padding: 24,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: "center",
              padding: "16px 0",
              textTransform: "uppercase",
              fontWeight: "700",
            }}
          >
            Giỏ hàng của bạn
          </Typography>
          {cartItems.length === 0 ? (
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              Giỏ hàng của bạn đang trống!
            </Typography>
          ) : (
            <div>
              <TableContainer component={Paper}>
                <Table aria-label="danh sách mặt hàng trong giỏ hàng">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: "700!important",
                          textAlign: "center",
                        }}
                      >
                        Sản phẩm
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "700!important",
                          textAlign: "center",
                        }}
                      >
                        Hình ảnh
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontWeight: "700!important",
                          textAlign: "center",
                        }}
                      >
                        Giá
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: "700!important",
                          textAlign: "center",
                        }}
                      >
                        Số lượng
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontWeight: "700!important",
                          textAlign: "center",
                        }}
                      >
                        Tổng cộng
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: "700!important",
                          textAlign: "center",
                        }}
                      >
                        Xóa khỏi giỏ hàng
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.cart_id}>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          {item.name}
                        </TableCell>
                        <TableCell>
                          <CardMedia
                            component="img"
                            height="50"
                            image={item.image}
                            alt={item.name}
                          />
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          {item.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            padding: "22px",
                          }}
                        >
                          <IconButton
                            onClick={() =>
                              handleQuantityChange(
                                item.cart_id,
                                item.quantity,
                                item.price,
                                "remove"
                              )
                            }
                          >
                            <RemoveCircleOutline />
                          </IconButton>
                          <Typography>{item.quantity}</Typography>
                          <IconButton
                            onClick={() =>
                              handleQuantityChange(
                                item.cart_id,
                                item.quantity,
                                item.price,
                                "add"
                              )
                            }
                          >
                            <AddCircleOutline />
                          </IconButton>
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          {item.total.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Button
                            onClick={() => handleRemoveItem(item.cart_id)}
                            variant="contained"
                            color="secondary"
                          >
                            Xóa
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div
                style={{
                  marginTop: "20px",
                  textAlign: "right",
                }}
              >
                <Typography variant="h6">Tổng: {totalAmount}</Typography>
                <Link
                  to="/payment"
                  onClick={() => {
                    const totalNumber = parseInt(
                      totalAmount.replace(/\D/g, "")
                    );
                    window.localStorage.setItem("total", totalNumber);
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "10px" }}
                  >
                    Thanh toán
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
