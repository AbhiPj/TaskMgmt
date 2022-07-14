import React from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Dialog,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomAppbar } from "../../components/Appbar";
import { useListChecklistQuery } from "../../state/checklistSlice";
import { useNavigate } from "react-router-dom";
import { AddChecklistForm } from "./checklistComponent/AddChecklistForm";
import { EditChecklistForm } from "./checklistComponent/EditChecklistForm";
import { GenerateChecklist } from "./checklistComponent/GenerateChecklist";

export const Checklist = () => {
  const getTask = sessionStorage.getItem("taskType");
  if (getTask == null) {
    sessionStorage.setItem("taskType", "unassigned");
  }
  const [addChecklistOpen, setAddChecklistOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [generateOpen, setGenerateOpen] = React.useState(false);

  const [checklistId, setChecklistId] = React.useState();

  const {
    data: rawList = [],
    isLoading: loadingChecklist,
    error: error,
  } = useListChecklistQuery();

  const columns = [
    {
      title: "Task",
      field: "name",
      width: 300,
      validate: (row) => (row.name || "").length !== 0,
    },
    {
      title: "Description",
      field: "description",
      validate: (row) => (row.description || "").length !== 0,
      // width: 600,
    },
  ];

  const handleAddChecklistClose = () => {
    setAddChecklistOpen(false);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleGenerateClose = () => {
    setGenerateOpen(false);
  };

  const navigate = useNavigate();
  return (
    <>
      {/* {loadingChecklist ? (
        "Loading..."
      ) : ( */}
      <>
        <Box sx={{ marginTop: 8 }}>
          <CustomAppbar></CustomAppbar>
        </Box>

        <Box sx={{ marginLeft: 30, marginTop: 12 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                //   setAddBucketOpen(true);
                setAddChecklistOpen(true);
              }}
            >
              Add Checklist
            </Button>
            <Button
              onClick={() => {
                setGenerateOpen(true);
              }}
              variant="outlined"
            >
              Generate
            </Button>
          </Box>
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
                <Box>
                  {/* <MTableToolbar {...props} showTitle={false} /> */}
                </Box>
              ),
            }}
            onRowClick={(e, data) => {
              // console.log(data);
              // setEditOpen(true);
              var id = data._id;
              // setBucketId(id);
              let path = `/checklist/task/${id}`;
              navigate(path);
            }}
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
                  setEditOpen(true);
                  var id = data._id;
                  setChecklistId(id);
                },
              },
            ]}
          />
        </Box>
        <Dialog open={addChecklistOpen} onClose={handleAddChecklistClose}>
          <AddChecklistForm></AddChecklistForm>
        </Dialog>
        <Dialog open={editOpen} onClose={handleEditClose}>
          <EditChecklistForm id={checklistId}></EditChecklistForm>
        </Dialog>
        <Dialog open={generateOpen} onClose={handleGenerateClose}>
          <GenerateChecklist id={checklistId}></GenerateChecklist>
        </Dialog>
      </>
      {/* )} */}
    </>
  );
};
