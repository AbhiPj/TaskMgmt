import React from "react";
import { Dialog } from "@mui/material";
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
import { TaskDetail } from "./taskScreen/taskComponent/TaskDetail";
import { CustomAppbar } from "../components/Appbar";
export const DashboardScreen = () => {
  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [editOpen, setEditOpen] = React.useState(false);
  const [detailOpen, setDetailOpen] = React.useState(false);

  const [taskId, setTaskId] = React.useState();

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleDetailClose = () => {
    setDetailOpen(false);
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
      // validate: (row) =>
      // (row.description || "").length == 0
      //   ? "Description is required"
      //   : true,
    },
    {
      title: "Priority",
      field: "priority",
      width: 130,
      lookup: { Low: "Low", Medium: "Medium", High: "High" },
      validate: (row) => (row.priority || "").length !== 0,
    },
    { title: "Assigned to", field: "assignedTo", width: 200 },
    { title: "Date Due", field: "dateDue", type: "date", width: 130 },
  ];

  // const { data: rawList = [] } = useListTaskQuery();

  const dept = "IT";

  const {
    data: rawList = [],
    isLoading: loadingTask,
    error: error,
  } = useListDepartmentTaskQuery(dept);

  return (
    <>
      <Box sx={{ marginTop: 8 }}>
        <CustomAppbar></CustomAppbar>
      </Box>
      <Box sx={{ color: blue, marginRight: 4 }}></Box>
      <Box
        sx={{
          width: 1250,
          marginLeft: 32,
          marginTop: 13,
        }}
      >
        <MaterialTable
          components={{
            Toolbar: (props) => (
              <div style={{ backgroundColor: "green" }}>
                <MTableToolbar {...props} />
              </div>
            ),
          }}
          onRowClick={(e, data) => {
            console.log(data);
            // setDetailOpen(true);
            setEditOpen(true);

            var id = data._id;
            setTaskId(id);
          }}
          title=""
          columns={columns}
          data={rawList}
          editable={{
            onRowAdd: (newRow) =>
              new Promise((resolve, reject) => {
                console.log(newRow);
                addTask(newRow);
                resolve();
              }),
          }}
          options={{
            search: false,
            addRowPosition: "first",
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: () => <DeleteIcon />,
              tooltip: "Delete",
              onClick: (e, data) => {
                // console.log(data);
                // setOpen(true);
                var id = data._id;
                deleteTask(id);
              },
            },
            {
              icon: () => <EditIcon />,
              tooltip: "Edit",
              onClick: (e, data) => {
                console.log(data);
                setEditOpen(true);
                var id = data._id;
                setTaskId(id);
              },
            },
          ]}
        />
      </Box>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <TaskForm taskId={taskId}></TaskForm>
      </Dialog>
      <Dialog open={detailOpen} onClose={handleDetailClose}>
        <TaskDetail taskId={taskId}></TaskDetail>
      </Dialog>
    </>
  );
};
