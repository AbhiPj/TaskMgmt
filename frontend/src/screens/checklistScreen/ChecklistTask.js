import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Dialog,
  Paper,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomAppbar } from "../../components/Appbar";
import {
  AddChecklistTaskForm,
  ChecklistTaskForm,
} from "./checklistComponent/AddChecklistTaskForm";
import { useDetailChecklistQuery } from "../../state/checklistSlice";
import { useParams } from "react-router-dom";
import { EditChecklistTask } from "./checklistComponent/EditChecklistTask";

export const ChecklistTask = () => {
  const [addChecklistOpen, setAddChecklistOpen] = useState(false);
  const [editChecklistOpen, setEditChecklistOpen] = useState(false);
  const [taskId, setTaskId] = useState();

  const handleAddChecklistClose = () => {
    setAddChecklistOpen(false);
  };

  const handleEditChecklistClose = () => {
    setEditChecklistOpen(false);
  };

  const { id } = useParams();
  const checklistId = id;
  const {
    data: rawList = [],
    isLoading: loadingChecklist,
    error: error,
  } = useDetailChecklistQuery(checklistId);
  console.log(rawList);

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

  return (
    <>
      {/* {loadingChecklist ? ( */}
      {/* "Loading..." */}
      {/* ) : ( */}
      <>
        <Box sx={{ marginTop: 8 }}>
          <CustomAppbar></CustomAppbar>
        </Box>
        <Box sx={{ marginLeft: 32, marginTop: 12 }}>
          <Box sx={{ mr: 2 }}>
            <Card sx={{ minWidth: 400, mb: 2 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14, mb: 2.5 }}
                  color="text.secondary"
                >
                  Checklist
                </Typography>
                <Typography variant="h6" sx={{ mb: 1.4 }} component="div">
                  {rawList.name}
                </Typography>

                <Typography variant="body2">
                  {rawList.description}
                  <br />
                </Typography>
              </CardContent>
              {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
            </Card>
          </Box>

          <ButtonGroup>
            <Button
              onClick={() => {
                //   setAddBucketOpen(true);
                setAddChecklistOpen(true);
              }}
            >
              Add Task
            </Button>
          </ButtonGroup>
        </Box>
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
                <div>{/* <MTableToolbar {...props} /> */}</div>
              ),
            }}
            onRowClick={(e, data) => {
              // console.log(data);
              // setEditOpen(true);
              var id = data._id;
              // setBucketId(id);
              // let path = `/bucket/task/${id}`;
              // navigate(path);
            }}
            title=""
            columns={columns}
            data={rawList?.checklistTasks}
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
                  // deleteBucket(id);
                },
              },
              {
                icon: () => <EditIcon />,
                tooltip: "Edit",
                onClick: (e, data) => {
                  // console.log(data);
                  setEditChecklistOpen(true);
                  var id = data._id;
                  setTaskId(id);
                },
              },
            ]}
          />
        </Box>
        <Dialog open={addChecklistOpen} onClose={handleAddChecklistClose}>
          <AddChecklistTaskForm id={checklistId}></AddChecklistTaskForm>
        </Dialog>
        <Dialog open={editChecklistOpen} onClose={handleEditChecklistClose}>
          <EditChecklistTask
            id={taskId}
            checklistId={checklistId}
          ></EditChecklistTask>
        </Dialog>
      </>
      {/* )} */}
    </>
  );
};
