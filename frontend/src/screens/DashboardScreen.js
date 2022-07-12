import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";
import {
  useListTaskQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useListDepartmentTaskQuery,
} from "../state/taskSlice";
import { blue } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskForm } from "./taskScreen/taskComponent/TaskForm";
import { CustomAppbar } from "../components/Appbar";
import { AddTaskForm } from "./taskScreen/taskComponent/addTaskForm";
import { BucketForm } from "./bucketScreen/BucketForm";
import { UngropuedTable } from "./taskScreen/taskComponent/UngroupedTable";
import { useListUserQuery } from "../state/userSlice";

export const DashboardScreen = () => {
  const getTask = sessionStorage.getItem("taskType");
  if (getTask == null) {
    sessionStorage.setItem("taskType", "unassigned");
  }

  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [addOpen, setAddOpen] = React.useState(false);
  const [addBucketOpen, setAddBucketOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [taskId, setTaskId] = React.useState();
  const [taskType, setTaskType] = React.useState(getTask);

  const { data: allList = [], isLoading: loadingAllTask } = useListTaskQuery();

  const dept = "IT";
  const { data: deptTask = [], isLoading: loadingTask } =
    useListDepartmentTaskQuery(dept);

  var rawList = [];
  var bucketList = [];

  // const {
  //   data: rawList = [],
  //   isLoading: loadingTask,
  //   error: error,
  // } = useListDepartmentTaskQuery(dept);

  if (taskType == "unassigned") {
    allList.map((item) => {
      if (!item.bucket) {
        rawList.push(item);
      }
    });

    // rawList.filter((item) => item.bucket == "");
  } else if (taskType == "bucket") {
    allList.map((item) => {
      if (item.bucket) {
        bucketList.push(item);
      }
    });
  }
  // setData(rawList);

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const handleAddBucketClose = () => {
    setAddBucketOpen(false);
  };

  return (
    <>
      {/* {loadingAllTask ? (
        "Loading... "
      ) : ( */}
      <>
        <Box>
          <CustomAppbar></CustomAppbar>
        </Box>
        <Box
          sx={{
            marginLeft: 34,
            marginTop: 11,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ButtonGroup sx={{ marginRight: 4 }}>
            <Button
              onClick={() => {
                setAddOpen(true);
              }}
            >
              Add Task
            </Button>
          </ButtonGroup>
        </Box>
        <Box sx={{ color: blue, marginRight: 4 }}></Box>
        <Box
          sx={{
            width: 1250,
            marginLeft: 32,
            marginTop: 3,
          }}
        >
          {/* {renderTable()} */}
          <UngropuedTable></UngropuedTable>
        </Box>

        <Dialog open={editOpen} onClose={handleEditClose}>
          <TaskForm taskId={taskId}></TaskForm>
        </Dialog>

        <Dialog open={addOpen} onClose={handleAddClose}>
          <AddTaskForm></AddTaskForm>
        </Dialog>

        <Dialog open={addBucketOpen} onClose={handleAddBucketClose}>
          <BucketForm></BucketForm>
        </Dialog>
      </>
      {/* )} */};
    </>
  );
};
