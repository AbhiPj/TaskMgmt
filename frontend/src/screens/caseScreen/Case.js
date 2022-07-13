import { Box, Button, Dialog } from "@mui/material";
import React from "react";
import { CustomAppbar } from "../../components/Appbar";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { GenerateChecklist } from "../checklistScreen/checklistComponent/GenerateChecklist";
import { useListCaseQuery } from "../../state/caseSlice";
import { useListChecklistQuery } from "../../state/checklistSlice";

export const Case = () => {
  const [generateOpen, setGenerateOpen] = React.useState(false);

  const { data: caseList, loading: loadingCase } = useListCaseQuery();
  const { data: rawList, loading: loadingChecklist } = useListChecklistQuery();

  const handleGenerateClose = () => {
    setGenerateOpen(false);
  };

  const navigate = useNavigate();

  const columns = [
    {
      title: "Task",
      field: "name",
      width: 300,
      validate: (row) => (row.name || "").length !== 0,
    },
  ];

  return (
    <>
      {loadingCase && loadingChecklist ? (
        "Loading..."
      ) : (
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
              {/* <Button
              variant="outlined"
              onClick={() => {
                //   setAddBucketOpen(true);
                // setAddChecklistOpen(true);
              }}
            >
              Add Checklist
            </Button> */}
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
                let path = `/case/task/${id}`;
                navigate(path);
              }}
              title=""
              columns={columns}
              data={caseList}
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
                    // console.log(data);
                    // setEditOpen(true);
                    // var id = data._id;
                    // setBucketId(id);
                  },
                },
              ]}
            />

            <Dialog open={generateOpen} onClose={handleGenerateClose}>
              <GenerateChecklist data={rawList}></GenerateChecklist>
            </Dialog>
          </Box>
        </>
      )}
    </>
  );
};
