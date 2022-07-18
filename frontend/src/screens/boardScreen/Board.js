import React from "react";
import { Box } from "@mui/system";
import { CustomAppbar } from "../../components/Appbar";
import { FilterAppBar } from "../../components/FilterAppBar";

export const Boards = () => {
  return (
    <>
      <Box>
        <CustomAppbar></CustomAppbar>
      </Box>
      <Box sx={{}}>
        <FilterAppBar component={"Board"}></FilterAppBar>
      </Box>
    </>
  );
};
