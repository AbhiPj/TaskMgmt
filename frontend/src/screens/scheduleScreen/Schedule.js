import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@mui/material";
import { CustomAppbar } from "../../components/Appbar";
import { FilterAppBar } from "../../components/FilterAppBar";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export const Schedule = () => {
  return (
    <>
      <Box sx={{}}>
        <CustomAppbar></CustomAppbar>
      </Box>
      <Box sx={{}}>
        <FilterAppBar component={"Schedule"}></FilterAppBar>
      </Box>
    </>
  );
};
