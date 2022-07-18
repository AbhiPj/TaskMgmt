import React from "react";
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
} from "../../state/taskSlice";
import { TaskForm } from "../taskScreen/taskComponent/TaskForm";
import { AddTaskForm } from "../taskScreen/taskComponent/addTaskForm";
import { FilterAppBar } from "../../components/FilterAppBar";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export const Schedule = () => {
  const dept = "IT";

  const [editOpen, setEditOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const [taskId, setTaskId] = React.useState();
  const [date, setDate] = React.useState({});

  const [editTask] = useEditTaskMutation();

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const onSelectEvent = (data) => {
    setEditOpen(true);
    setTaskId(data.id);
  };

  const {
    data: rawList = [],
    isLoading: loadingTask,
    error: error,
  } = useListDepartmentTaskQuery(dept);

  const filteredTask = rawList.map(
    ({ name: title, _id: id, startDate: start, dueDate: end }) => ({
      id,
      title,
      start: new Date(start),
      end: new Date(end),
    })
  );

  const onSelectSlot = (data) => {
    setDate({
      startDate: data.start,
      endDate: data.end,
    });
    setAddOpen(true);
  };

  const onEventDrop = (data) => {
    const { start, end, event } = data;
    const updatedTask = {
      id: event.id,
      body: {
        startDate: start,
        dueDate: end,
      },
    };
    editTask(updatedTask);
  };

  const onEventResize = (data) => {
    const { start, end, event } = data;
    const updatedTask = {
      id: event.id,
      body: {
        startDate: start,
        dueDate: end,
      },
    };
    editTask(updatedTask);
  };

  return (
    <>
      {loadingTask ? (
        "Loading... "
      ) : (
        <>
          <Box sx={{}}>
            <CustomAppbar></CustomAppbar>
          </Box>
          <Box sx={{}}>
            <FilterAppBar component={"Schedule"}></FilterAppBar>
          </Box>

          <Box sx={{}}>
            <DnDCalendar
              defaultDate={moment().toDate()}
              defaultView="month"
              events={filteredTask}
              localizer={localizer}
              onEventDrop={onEventDrop}
              onSelectEvent={onSelectEvent}
              onSelectSlot={onSelectSlot}
              onEventResize={onEventResize}
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
