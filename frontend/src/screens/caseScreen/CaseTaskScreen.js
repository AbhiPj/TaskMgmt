import MaterialTable from "@material-table/core";
import { Box } from "@mui/material";
import React from "react";
import { CustomAppbar } from "../../components/Appbar";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDetailCaseQuery } from "../../state/caseSlice";
export const CaseTaskScreen = () => {
  const { id } = useParams();
  const {
    data: rawList = [],
    isLoading: loadingChecklist,
    error: error,
  } = useDetailCaseQuery(id);
  //   console.log(rawList.checklist?.checklistTasks);
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

  return (
    <>
      {loadingChecklist ? (
        <>Loading....</>
      ) : (
        <>
          <Box sx={{ marginTop: 8 }}>
            <CustomAppbar></CustomAppbar>
          </Box>
          <Box
            sx={{
              width: 1250,
              marginLeft: 32,
              marginTop: 12,
            }}
          >
            <MaterialTable
              components={{
                Toolbar: (props) => (
                  <div>{/* <MTableToolbar {...props} /> */}</div>
                ),
              }}
              onRowClick={(e, data) => {
                // setEditOpen(true);
                // var id = data._id;
                // setTaskId(id);
              }}
              title=""
              columns={columns}
              data={rawList.checklist.checklistTasks}
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
                    // var id = data._id;
                    // deleteTask(id);
                  },
                },
                {
                  icon: () => <EditIcon />,
                  tooltip: "Edit",
                  onClick: (e, data) => {
                    // setEditOpen(true);
                    // var id = data._id;
                    // setTaskId(id);
                  },
                },
              ]}
            />
          </Box>{" "}
        </>
      )}
    </>
  );
};
