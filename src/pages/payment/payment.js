import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header/Header";
import HeaderSigned from "../../layouts/Header/HeaderSigned";
import Footer from "../../layouts/Footer/Footer";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";

const PaymentPage = () => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [userData, setUserData] = useState(null);
  const [provinceName, setProvinceName] = useState("");
  const [districtName, setDistrictName] = useState("");

  const [totalAmount, setTotalAmount] = useState("");

  const [discountCode, setDiscountCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0); // State to hold discount percentage

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
        } else {
          alert("Vui lòng đăng nhập để thực hiện chức năng này!");
          window.location.href = "/auth";
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    const totalAmount = window.localStorage.getItem("total");
    setTotalAmount(totalAmount);

    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get("https://vapi.vnappmob.com/api/province")
      .then((response) => {
        setProvinces(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });
  }, []);

  const handleProvinceChange = (event) => {
    const provinceId = event.target.value;
    setSelectedProvince(provinceId);
    setSelectedDistrict("");

    const selectedProvinceName = provinces.find(
      (province) => province.province_id === provinceId
    )?.province_name;
    setProvinceName(selectedProvinceName);

    axios
      .get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`)
      .then((response) => {
        setDistricts(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching districts:", error);
      });
  };

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);

    const selectedDistrictName = districts.find(
      (district) => district.district_id === districtId
    )?.district_name;

    setDistrictName(selectedDistrictName);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleDiscountCodeChange = (event) => {
    setDiscountCode(event.target.value);
    const totalAmount = window.localStorage.getItem("total");
    setTotalAmount(totalAmount);
    setDiscountPercentage(0);
  };

  const handleCheckDiscount = async () => {
    const totalAmount = window.localStorage.getItem("total");

    if (!discountCode) {
      alert("Vui lòng nhập mã giảm giá.");
      return;
    }
    // Call API to check discount code validity
    try {
      const response = await axios.get(
        `http://192.168.27.1:1407/discount/${discountCode}`
      );

      if (response.status === 200) {
        setDiscountPercentage(response.data * 100);
        setTotalAmount(totalAmount * (1 - response.data));
      } else if (response.status === 201) {
        alert("Mã giảm giá không hợp lệ.");
      }
    } catch (error) {
      console.error("Error checking discount code:", error);
    }
  };

  const handleSubmit = () => {
    if (!selectedProvince || !selectedDistrict || !address || !paymentMethod) {
      alert("Vui lòng điền đầy đủ thông tin thanh toán.");
    } else {
      const addressSelected = `${address}, ${districtName}, ${provinceName}`;

      const orderId = Date.now().toString().slice(-12);
      axios
        .post("http://192.168.27.1:1407/orders", {
          orderId,
          userId: userData.id,
          address: addressSelected,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
          } else {
            console.log("Lỗi !!!");
          }
        });

      // Apply discount if there is any
      let finalAmount = parseInt(totalAmount);

      const requestBody = {
        orderId: orderId,
        amount: finalAmount, // Use finalAmount after discount
        bankCode: "",
        language: "vi",
      };

      axios
        .post("http://localhost:8888/order/create_payment_url", requestBody)
        .then((response) => {
          console.log(response);
          window.open(response.data, "_blank");
        })
        .catch((error) => {
          console.log("Lối post nè!!");
        });
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {userData ? <HeaderSigned /> : <Header />}
      <main style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Thanh toán đơn hàng
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel
                id="province-label"
                sx={{
                  backgroundColor: "#fff",
                }}
              >
                Tỉnh
              </InputLabel>
              <Select
                labelId="province-label"
                id="province"
                value={selectedProvince}
                onChange={handleProvinceChange}
              >
                {provinces.map((province) => (
                  <MenuItem
                    key={province.province_id}
                    value={province.province_id}
                  >
                    {province.province_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel
                id="district-label"
                sx={{
                  backgroundColor: "#fff",
                }}
              >
                Huyện
              </InputLabel>
              <Select
                labelId="district-label"
                id="district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={!selectedProvince}
              >
                {districts.map((district) => (
                  <MenuItem
                    key={district.district_id}
                    value={district.district_id}
                  >
                    {district.district_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Địa chỉ"
              value={address}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel
                id="payment-method-label"
                sx={{
                  backgroundColor: "#fff",
                }}
              >
                Phương thức thanh toán
              </InputLabel>
              <Select
                labelId="payment-method-label"
                id="payment-method"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <MenuItem value="vnpay">VNPay</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              label="Mã giảm giá"
              value={discountCode}
              onChange={handleDiscountCodeChange}
              sx={{
                width: "60%",
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckDiscount}
              sx={{
                padding: "16px",
              }}
            >
              Kiểm tra mã giảm giá
            </Button>
          </Grid>
          <Grid item xs={12} align="center">
            {discountPercentage > 0 && (
              <Typography
                variant="h6"
                align="center"
                sx={{
                  color: "red",
                }}
              >
                Giảm giá: {discountPercentage}%
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h6" align="center" gutterBottom>
              Tổng tiền cần thanh toán:{" "}
              {parseInt(totalAmount).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Thanh toán ngay
            </Button>
          </Grid>
        </Grid>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
