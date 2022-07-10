import React from "react";
import { Button, ButtonGroup, Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomAppbar } from "../../components/Appbar";
import { ChecklistTaskForm } from "./checklistComponent/ChecklistTaskForm";
// import { useListChecklistQuery } from "../../state/checklistSlice";

export const ChecklistTask = (id) => {
  const [addChecklistOpen, setAddChecklistOpen] = React.useState(false);

  const handleAddChecklistClose = () => {
    setAddChecklistOpen(false);
  };
  //   const {
  //     data: rawList = [],
  //     isLoading: loadingChecklist,
  //     error: error,
  //   } = useListChecklistQuery();

  //   const columns = [
  //     {
  //       title: "Task",
  //       field: "name",
  //       width: 300,
  //       validate: (row) => (row.name || "").length !== 0,
  //     },
  //     {
  //       title: "Description",
  //       field: "description",
  //       validate: (row) => (row.description || "").length !== 0,
  //       // width: 600,
  //     },
  //   ];

  return (
    <>
      {/* {loadingChecklist ? ( */}
      {/* "Loading..." */}
      {/* ) : ( */}
      <>
        <Box sx={{ marginTop: 8 }}>
          <CustomAppbar></CustomAppbar>
        </Box>
        <Box sx={{ marginLeft: 34, marginTop: 12 }}>
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
                <div style={{ backgroundColor: "green" }}>
                  <MTableToolbar {...props} />
                </div>
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
            //   columns={columns}
            //   data={rawList}
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
                  // deleteBucket(id);
                },
              },
              {
                icon: () => <EditIcon />,
                tooltip: "Edit",
                onClick: (e, data) => {
                  // console.log(data);
                  // setEditOpen(true);
                  // var id = data._id;
                  // setBucketId(id);
                },
              },
            ]}
          />
        </Box>
        <Dialog open={addChecklistOpen} onClose={handleAddChecklistClose}>
          <ChecklistTaskForm></ChecklistTaskForm>
        </Dialog>
      </>
      {/* )} */}
    </>
  );
};
