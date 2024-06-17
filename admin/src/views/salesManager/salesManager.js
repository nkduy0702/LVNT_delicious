import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { Chart } from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";

function RevenueManagement() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderDetailsByMonth, setOrderDetailsByMonth] = useState([]);
  const [orderDetailsfilter, setOrderDetailsfilter] = useState([]);
  const [barChartData, setBarChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const fetchSaleData = async () => {
      try {
        const response = await axios.get("http://192.168.27.1:1407/sale");
        if (response.status === 200) {
          const data = response.data;
          setOrderDetailsfilter(data);
          setOrderDetails(data);
          generateChartData(data);
        }
      } catch (error) {
        console.error("Error fetching sale data:", error);
      }
    };
    fetchSaleData();
  }, []);

  useEffect(() => {
    const fetchSaleDataByMonth = async () => {
      try {
        const response = await axios.get(
          "http://192.168.27.1:1407/sale/byMonth"
        );
        if (response.status === 200) {
          const data = response.data;
          setOrderDetailsByMonth(data);
          extractMonths(data);
        }
      } catch (error) {
        console.error("Error fetching sale data:", error);
      }
    };
    fetchSaleDataByMonth();
  }, []);

  const extractMonths = (data) => {
    console.log(data);
    const uniqueMonths = [...new Set(data.map((item) => item.month))];
    setMonths(uniqueMonths);
  };

  const filterDataByMonth = () => {
    const filteredData = orderDetailsByMonth.filter(
      (item) => item.month === selectedMonth
    );
    setOrderDetailsfilter(filteredData);
    generateChartData(filteredData);
  };

  const generateChartData = (data) => {
    const ingredients = {};
    let total = 0;

    data.forEach((item) => {
      ingredients[item.ingredient] = {
        quantity: item.total_quantity,
        subtotal: item.total_price,
      };
      total += item.total_price;
    });

    const labels = Object.keys(ingredients);
    const values = Object.values(ingredients);

    // Bar Chart Data
    setBarChartData({
      labels: labels,
      datasets: [
        {
          label: "Revenue by Ingredient",
          data: values.map((item) => item.subtotal),
          backgroundColor: "rgba(75,192,192,0.6)",
        },
      ],
    });

    // Pie Chart Data
    setPieChartData({
      labels: labels,
      datasets: [
        {
          label: "Quantity by Ingredient",
          data: values.map((item) => (item.subtotal / total) * 100),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#8A2BE2",
            "#00FF7F",
            "#7B68EE",
            "#FFA500",
          ],
        },
      ],
    });

    // Set total revenue
    setTotalRevenue(total);
  };

  return (
    <Container>
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 5,
          textAlign: "center",
        }}
      >
        Revenue Management
      </Typography>
      <TextField
        select
        label="Select Month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        sx={{ mb: 3, width: "150px" }}
      >
        {months.map((month, index) => (
          <MenuItem key={index} value={month}>
            {month}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        onClick={filterDataByMonth}
        style={{
          padding: "15px",
          marginLeft: "8px",
        }}
      >
        Filter
      </Button>
      {orderDetails.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          No Data!
        </Typography>
      ) : (
        <>
          <div style={{ width: "60vw", margin: "14px auto 100px auto" }}>
            <Bar
              data={barChartData}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function (value) {
                        return value.toLocaleString("vi-VN") + " VND";
                      },
                    },
                  },
                },
              }}
            />
          </div>

          <div style={{ width: "30vw", margin: "14px auto 100px auto" }}>
            <Pie
              data={pieChartData}
              options={{
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        let label =
                          context.dataset.label || context.label || "";
                        if (label) {
                          label += ": ";
                        }
                        label += context.parsed.toLocaleString("vi-VN") + "%";
                        return label;
                      },
                    },
                  },
                },
              }}
            />
          </div>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 5,
              textAlign: "center",
            }}
          >
            Detail of Revenue
          </Typography>

          <TableContainer
            component={Paper}
            sx={{
              width: "60vw",
              margin: "0 auto",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: "center", fontWeight: "900" }}>
                    Ingredient
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontWeight: "900" }}>
                    Quantity
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontWeight: "900" }}>
                    Subtotal
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetailsfilter.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {item.ingredient}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {item.total_quantity}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {item.total_price.toLocaleString("vi-VN")} VND
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2} align="right">
                    <strong>Total Revenue:</strong>
                  </TableCell>
                  <TableCell
                    style={{
                      color: "red",
                    }}
                  >
                    <strong>{totalRevenue.toLocaleString("vi-VN")} VND</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
}

export default RevenueManagement;
