import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

import ExTable from "./ExTable";

const ProductPerformance = () => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box>
          <Box>
            <Typography
              variant="h3"
              sx={{
                marginBottom: "0",

                textAlign: "center",
              }}
              gutterBottom
            >
              Users Manager
            </Typography>
          </Box>

          <Box
            sx={{
              marginLeft: "auto",
              mt: {
                lg: 0,
                xs: 2,
              },
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            overflow: "auto",
            mt: 3,
          }}
        >
          <ExTable />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductPerformance;
