import React from "react";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Dialog } from "@mui/material";

import {
  useDeleteTaskMutation,
  useListBucketTaskQuery,
} from "../../state/taskSlice";
import { TaskForm } from "../taskScreen/taskComponent/TaskForm";
import { AddTaskForm } from "../taskScreen/taskComponent/addTaskForm";
import { useParams } from "react-router-dom";
import { CustomAppbar } from "../../components/Appbar";

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
  { title: "Date Due", field: "dueDate", type: "date", width: 130 },
];

export const BucketTaskScreen = () => {
  const { id } = useParams();

  const [deleteTask] = useDeleteTaskMutation();

  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [taskId, setTaskId] = React.useState();
  const [addBucketOpen, setAddBucketOpen] = React.useState(false);

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const handleAddBucketClose = () => {
    setAddBucketOpen(false);
  };

  const { data: rawList = [], isLoading: loadingAllTask } =
    useListBucketTaskQuery(id);
  const filteredList = rawList.map(
    ({
      name,
      _id: id,
      description: description,
      department,
      assignedTo,
      priority,
      dueDate,
      sourceInfo,
    }) => ({
      name,
      dueDate,
      priority,
      id,
      description,
      department,
      assignedTo: assignedTo?.name,
    })
  );
  return (
    <>
      <Box sx={{ marginTop: 8 }}>
        <CustomAppbar></CustomAppbar>
      </Box>
      <Box sx={{}}>
        <MaterialTable
          components={{
            Toolbar: (props) => <div>{/* <MTableToolbar {...props} /> */}</div>,
          }}
          onRowClick={(e, data) => {
            setEditOpen(true);
            var id = data._id;
            setTaskId(id);
          }}
          title=""
          columns={columns}
          data={filteredList}
          options={{
            headerStyle: {
              backgroundColor: "#Ccd3e6",
            },
            search: false,
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

      <Dialog open={addOpen} onClose={handleAddClose}>
        <AddTaskForm></AddTaskForm>
      </Dialog>
    </>
  );
};
