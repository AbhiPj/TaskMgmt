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
  useEditTaskMutation,
  useListDepartmentTaskQuery,
  useListTaskQuery,
} from "../../state/taskSlice";
import { TaskForm } from "../taskScreen/taskComponent/TaskForm";
import { AddTaskForm } from "../taskScreen/taskComponent/addTaskForm";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export const Schedule = () => {
  const [editOpen, setEditOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const [taskId, setTaskId] = React.useState();
  const [editTask] = useEditTaskMutation();
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
              onEventDrop={(data) => {
                const { start, end, event } = data;
                const updatedTask = {
                  id: event.id,
                  body: {
                    startDate: start,
                    dateDue: end,
                  },
                };
                editTask(updatedTask);
              }}
              onSelectEvent={onSelectEvent}
              onSelectSlot={onSelectSlot}
              onEventResize={(data) => {
                const { start, end, event } = data;
                const updatedTask = {
                  id: event.id,
                  body: {
                    startDate: start,
                    dateDue: end,
                  },
                };
                editTask(updatedTask);
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
            <AddTaskForm date={date}></AddTaskForm>
          </Dialog>
        </>
      )}
    </>
  );
};
