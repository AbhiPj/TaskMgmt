import React from "react";
import { Button, ButtonGroup, Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import {
  useListTaskQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useListDepartmentTaskQuery,
} from "../../../state/taskSlice";
import {
  useDeleteBucketMutation,
  useListBucketQuery,
} from "../../../state/bucketSlice";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import { blue } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskForm } from "./TaskForm";
import { CustomAppbar } from "../../../components/Appbar";
import { AddTaskForm } from "./addTaskForm";
import { BucketForm } from "../../bucketScreen/BucketForm";
import { EditBucketForm } from "../../bucketScreen/EditBucket";
import { useNavigate } from "react-router-dom";

export const TaskBucket = () => {
  const [addTask] = useAddTaskMutation();
  const [deleteBucket] = useDeleteBucketMutation();
  const [addOpen, setAddOpen] = React.useState(false);
  const [addBucketOpen, setAddBucketOpen] = React.useState(false);

  const [editOpen, setEditOpen] = React.useState(false);
  const [bucketId, setBucketId] = React.useState();

  const dept = "IT";

  const {
    data: rawList = [],
    isLoading: loadingBucket,
    error: error,
  } = useListBucketQuery();

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const handleAddBucketClose = () => {
    setAddBucketOpen(false);
  };

  const navigate = useNavigate();
  const taskRoute = (a) => {
    let path = `/bucket/table`;
    navigate(path);
  };

  const columns = [
    {
      title: "Task",
      field: "name",
      // width: 150,
      validate: (row) => (row.name || "").length !== 0,
    },
  ];

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
          // onRowClick={(e, data) => {
          //   // console.log(data);
          //   setEditOpen(true);
          //   var id = data._id;
          //   setBucketId(id);
          // }}
          onRowClick={taskRoute}
          title=""
          columns={columns}
          data={rawList}
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
                deleteBucket(id);
              },
            },
            {
              icon: () => <EditIcon />,
              tooltip: "Edit",
              onClick: (e, data) => {
                // console.log(data);
                setEditOpen(true);
                var id = data._id;
                setBucketId(id);
              },
            },
          ]}
        />
      </Box>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <EditBucketForm bucketId={bucketId}></EditBucketForm>
      </Dialog>

      <Dialog open={addBucketOpen} onClose={handleAddBucketClose}>
        <BucketForm></BucketForm>
      </Dialog>
    </>
  );
};
