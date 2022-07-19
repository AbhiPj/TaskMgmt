import { Box, Typography } from "@mui/material";
import React from "react";

export const NotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      //   backgroundColor="green"
      sx={{ height: "100vh", width: "100%" }}
    >
      <Typography variant="h4">404 Not found</Typography>
    </Box>
  );
};
