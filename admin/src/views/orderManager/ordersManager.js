import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Tabs,
  Tab,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import { green, blue, grey } from "@mui/material/colors";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState("processing");

  const fetchOrdersByState = async (state) => {
    try {
      const response = await axios.get(
        `http://192.168.27.1:1407/orders?state=${state}`
      );
      setOrders(response.data);
      setSelectedTab(state);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrdersByState(selectedTab);
  }, [selectedTab]);

  const handleStateUpdate = async (orderId, newState) => {
    try {
      const response = await axios.put(`http://192.168.27.1:1407/orders/`, {
        state: newState,
        id: orderId,
      });
      if (response.status === 200) {
        fetchOrdersByState(newState);
      } else {
        console.log("Server Error");
      }
    } catch (error) {
      console.error("Error updating order state:", error);
    }
  };

  const stateColor = {
    processing: grey[500],
    shipped: blue[500],
    delivered: green[500],
  };

  return (
    <div>
      <Typography
        variant="h2"
        sx={{
          mt: -4,
          fontWeight: "bold",
          mb: 5,
          textAlign: "center",
        }}
      >
        Orders Management
      </Typography>

      <Tabs
        value={selectedTab}
        onChange={(e, newValue) => fetchOrdersByState(newValue)}
        textColor="primary"
        indicatorColor="primary"
        sx={{
          marginBottom: "24px",
        }}
      >
        <Tab label="Processing" value="processing" />
        <Tab label="Shipped" value="shipped" />
        <Tab label="Delivered" value="delivered" />
      </Tabs>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    color: "grey",
                  }}
                >
                  Order ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    color: "grey",
                  }}
                >
                  User Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    color: "grey",
                  }}
                >
                  Address
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    color: "grey",
                  }}
                >
                  State
                </Typography>
              </TableCell>
              {selectedTab !== "delivered" && (
                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      color: "grey",
                    }}
                  >
                    Actions
                  </Typography>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.order_id}>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {order.order_id}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {order.username}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {order.address}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Box
                    bgcolor={stateColor[order.state]}
                    color="white"
                    p={1}
                    borderRadius={4}
                  >
                    <Typography variant="body2">{order.state}</Typography>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {order.state === "processing" && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleStateUpdate(order.order_id, "shipped")
                      }
                    >
                      Ship
                    </Button>
                  )}
                  {order.state === "shipped" && (
                    <Button
                      variant="contained"
                      style={{ backgroundColor: green[500], color: "#fff" }}
                      onClick={() =>
                        handleStateUpdate(order.order_id, "delivered")
                      }
                    >
                      Deliver
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderManagement;
