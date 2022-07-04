import React from "react";
import ReactDOM from "react-dom";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Dialog } from "@mui/material";
import { CustomAppbar } from "../../components/Appbar";

import {
  useListDepartmentTaskQuery,
  useListTaskQuery,
} from "../../state/taskSlice";
import { TaskForm } from "../taskScreen/taskComponent/TaskForm";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export const Schedule = () => {
  const [editOpen, setEditOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);

  const [taskId, setTaskId] = React.useState();

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  // const {
  //   data: rawList = [],
  //   isLoading: loadingTask,
  //   error: error,
  // } = useListTaskQuery();

  const dept = "IT";

  const {
    data: rawList = [],
    isLoading: loadingTask,
    error: error,
  } = useListDepartmentTaskQuery(dept);

  const filteredTask = rawList.map(
    ({ name: title, _id: id, startDate: start, dateDue: end }) => ({
      id,
      title,
      start: new Date(start),
      end: new Date(end),
    })
  );

  const onEventDrop = (data) => {
    console.log(data, "drop");
  };

  const onSelectEvent = (data) => {
    console.log(data, "select");
    setEditOpen(true);
    setTaskId(data.id);
  };

  var [date, setDate] = React.useState({});

  const onSelectSlot = (data) => {
    setDate({
      startDate: data.start,
      endDate: data.end,
    });
    setAddOpen(true);
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
              onSelectEvent={onSelectEvent}
              onSelectSlot={onSelectSlot}
              onEventResize={(data) => {
                const { start, end } = data;
                console.log(start, "start");
              }}
              resizable
              selectable
              style={{ height: "100vh" }}
            />
          </Box>
          <Dialog open={editOpen} onClose={handleEditClose}>
            <TaskForm taskId={taskId}></TaskForm>
          </Dialog>
          <Dialog open={addOpen} onClose={handleAddClose}>
            <TaskForm date={date}></TaskForm>
          </Dialog>
        </>
      )}
    </>
  );
};
