import React from "react";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useDeleteTaskMutation,
  useListBucketTaskQuery,
} from "../../../state/taskSlice";
import { Dialog } from "@mui/material";
import { TaskForm } from "./TaskForm";
import { AddTaskForm } from "./addTaskForm";

export const UngropuedTable = (data) => {
  const [deleteTask] = useDeleteTaskMutation();

  const [addOpen, setAddOpen] = React.useState(false);
  const [addBucketOpen, setAddBucketOpen] = React.useState(false);

  const [editOpen, setEditOpen] = React.useState(false);
  const [taskId, setTaskId] = React.useState();
  // const { data: rawList = [], isLoading: loadingAllTask } = useListTaskQuery();
  const { data: rawList = [], isLoading: loadingAllTask } =
    useListBucketTaskQuery("62c41e0c24215b909b5a2a02");

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
        components={{
          Toolbar: (props) => (
            <div style={{ backgroundColor: "green" }}>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        onRowClick={(e, data) => {
          // console.log(data);
          setEditOpen(true);
          var id = data._id;
          setTaskId(id);
        }}
        title=""
        columns={columns}
        data={data.data}
        // editable={{
        //   onRowAdd: (newRow) =>
        //     new Promise((resolve, reject) => {
        //       console.log(newRow);
        //       addTask(newRow);
        //       resolve();
        //     }),
        // }}
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
