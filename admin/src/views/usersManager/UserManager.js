import React from "react";
import { Grid, Box } from "@mui/material";

import UsersManager from "./components/UserData";

const Dashboard1 = () => {
  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <UsersManager />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard1;
