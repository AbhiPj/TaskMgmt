import React from "react";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  useDeleteTaskMutation,
  useListBucketTaskQuery,
} from "../../../state/taskSlice";

import {
  Box,
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { TaskForm } from "./TaskForm";
import { AddTaskForm } from "./addTaskForm";

export const UngropuedTable = (data) => {
  const getTask = sessionStorage.getItem("taskType");

  const [deleteTask] = useDeleteTaskMutation();

  const [addOpen, setAddOpen] = React.useState(false);
  const [addBucketOpen, setAddBucketOpen] = React.useState(false);
  const [taskType, setTaskType] = React.useState(getTask);

  const [editOpen, setEditOpen] = React.useState(false);
  const [taskId, setTaskId] = React.useState();
  // const { data: rawList = [], isLoading: loadingAllTask } = useListTaskQuery();
  // const { data: rawList = [], isLoading: loadingAllTask } =
  //   useListBucketTaskQuery("62c41e0c24215b909b5a2a02");

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const handleAddBucketClose = () => {
    setAddBucketOpen(false);
  };

  const columns = [
    {
      title: "Task",
      field: "name",
      width: 150,
      validate: (row) => (row.name || "").length !== 0,
    },
    {
      title: "Description",
      field: "description",
      validate: (row) => (row.description || "").length !== 0,
      width: 600,
    },
    {
      title: "Priority",
      field: "priority",
      width: 130,
      lookup: { Low: "Low", Medium: "Medium", High: "High" },
      validate: (row) => (row.priority || "").length !== 0,
    },
    {
      title: "Department",
      field: "department",
      width: 130,
      lookup: { IT: "IT", Finance: "Finance" },
      validate: (row) => (row.priority || "").length !== 0,
    },
    { title: "Assigned to", field: "assignedTo", width: 200 },
    { title: "Date Due", field: "dateDue", type: "date", width: 130 },
  ];

  return (
    <>
      <MaterialTable
        onRowClick={(e, data) => {
          // console.log(data);
          setEditOpen(true);
          var id = data._id;
          setTaskId(id);
        }}
        title=""
        columns={columns}
        data={data.data}
        options={{
          // search: false,
          // filtering: true,
          addRowPosition: "first",
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: () => <DeleteIcon />,
            tooltip: "Delete",
            onClick: (e, data) => {
              var id = data._id;
              deleteTask(id);
            },
          },
          {
            icon: () => <EditIcon />,
            tooltip: "Edit",
            onClick: (e, data) => {
              // console.log(data);
              setEditOpen(true);
              var id = data._id;
              setTaskId(id);
            },
          },
        ]}
        components={{
          Toolbar: (props) => (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 1,
                  padding: "1rem",
                }}
              >
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <FormControl
                    sx={{
                      width: 200,
                      // marginRight: 4,
                      color: "#1976d2",
                    }}
                    size="small"
                  >
                    <InputLabel
                      sx={{ color: "inherit" }}
                      id="demo-select-small"
                    >
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
                  </FormControl>
                  <Button variant="outlined">
                    <FilterListIcon />
                    Filter
                  </Button>
                </Box>

                <MTableToolbar {...props} />
              </Box>
            </>
          ),
        }}
      />
      <Dialog open={editOpen} onClose={handleEditClose}>
        <TaskForm taskId={taskId}></TaskForm>
      </Dialog>

      <Dialog open={addOpen} onClose={handleAddClose}>
        <AddTaskForm></AddTaskForm>
      </Dialog>
    </>
  );
};
