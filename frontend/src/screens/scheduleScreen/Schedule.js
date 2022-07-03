import React from "react";
import ReactDOM from "react-dom";
import events from "./events";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@mui/material";
import { CustomAppbar } from "../../components/Appbar";

import { useListTaskQuery } from "../../state/taskSlice";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export const Schedule = () => {
  const {
    data: rawList = [],
    isLoading: loadingTask,
    error: error,
  } = useListTaskQuery();

  const filteredTask = rawList.map(
    ({ name: title, _id: id, startDate: start, dateDue: end }) => ({
      id,
      title,
      start: new Date(start),
      end: new Date(end),
    })
  );

  console.log(filteredTask, "filterTask");

  // rawList.map((s) => {
  //   console.log(
  //     s.startDate,
  //     s.dateDue,
  //     new Date(s.startDate),
  //     new Date(s.dateDue)
  //   );
  // });
  const onEventDrop = (data) => {
    console.log(data);
  };

  return (
    <>
      {loadingTask ? (
        "Loading... "
      ) : (
        <>
          <Box sx={{ marginTop: 10 }}>
            <CustomAppbar></CustomAppbar>
          </Box>
          <Box sx={{ marginTop: 4, marginLeft: 30 }}>
            <DnDCalendar
              defaultDate={moment().toDate()}
              defaultView="month"
              events={filteredTask}
              localizer={localizer}
              onEventDrop={onEventDrop}
              onEventResize={(data) => {
                const { start, end } = data;
                console.log(start, "start");
              }}
              resizable
              style={{ height: "100vh" }}
            />
            {/* <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      /> */}
          </Box>
        </>
      )}
    </>
  );
};
