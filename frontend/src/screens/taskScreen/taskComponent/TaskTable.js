import React from "react";
import Box from "@mui/material/Box";
import { Button, ButtonGroup, Dialog } from "@mui/material";
import { blue } from "@mui/material/colors";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomAppbar } from "../../../components/Appbar";
import {
  useListBucketTaskQuery,
  useListTaskQuery,
} from "../../../state/taskSlice";

export const TaskTable = (id) => {
  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [taskId, setTaskId] = React.useState();
  // const { data: rawList = [], isLoading: loadingAllTask } = useListTaskQuery();
  const { data: rawList = [], isLoading: loadingAllTask } =
    useListBucketTaskQuery("62c41e0c24215b909b5a2a02");

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
      <Box sx={{ marginTop: 8 }}>
        <CustomAppbar></CustomAppbar>
      </Box>
      <Box sx={{ marginLeft: 34, marginTop: 12 }}>
        {/* <ButtonGroup>
          <Button
            onClick={() => {
              setAddOpen(true);
            }}
          >
            Add Task
          </Button>
        </ButtonGroup> */}
      </Box>
      <Box sx={{ color: blue, marginRight: 4 }}></Box>
      <Box
        sx={{
          width: 1250,
          marginLeft: 32,
          marginTop: 3,
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
            setEditOpen(true);
            var id = data._id;
            setTaskId(id);
          }}
          title=""
          columns={columns}
          data={rawList}
          options={{
            search: false,
            addRowPosition: "first",
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: () => <DeleteIcon />,
              tooltip: "Delete",
              // onClick: (e, data) => {
              //   var id = data._id;
              //   deleteTask(id);
              // },
            },
            {
              icon: () => <EditIcon />,
              tooltip: "Edit",
              // onClick: (e, data) => {
              //   setEditOpen(true);
              //   var id = data._id;
              //   setTaskId(id);
              // },
            },
          ]}
        />
      </Box>
    </>
  );
};
