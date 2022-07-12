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
import MaterialTable, { MTableToolbar } from "@material-table/core";
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
  const [data, setData] = useState("Ss");

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

  const renderTable = () => {
    if (taskType == "unassigned") {
      return <UngropuedTable data={rawList}></UngropuedTable>;
    } else if (taskType == "bucket") {
      return <UngropuedTable data={bucketList}></UngropuedTable>;
    }
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
          {/* <FormControl
            sx={{
              width: 180,
              marginRight: 4,
              color: "#1976d2",
            }}
            size="small"
          >
            <InputLabel sx={{ color: "inherit" }} id="demo-select-small">
              Task Type
            </InputLabel>
            <Select
              sx={{ color: "inherit" }}
              labelId="demo-simple-select-label"
              id="demo-select-small"
              value={taskType}
              label="Priority"
              onChange={(e) => {
                setTaskType(e.target.value);
                if (e.target.value == "unassigned") {
                  sessionStorage.setItem("taskType", "unassigned");
                } else if (e.target.value == "bucket") {
                  sessionStorage.setItem("taskType", "bucket");
                } else if (e.target.value == "checklist") {
                  sessionStorage.setItem("taskType", "checklist");
                }
              }}
            >
              <MenuItem value={"unassigned"}>Unassigned</MenuItem>
              <MenuItem value={"bucket"}> Buckets</MenuItem>
              <MenuItem value={"checklist"}> Checklist</MenuItem>
            </Select>
          </FormControl> */}
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
          {renderTable()}
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
