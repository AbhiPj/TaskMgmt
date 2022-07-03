import React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import TaskIcon from "@mui/icons-material/Task";
import {
  Grid,
  Typography,
  Divider,
  Container,
  Button,
  Dialog,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDetailTaskQuery } from "../../../state/taskSlice";
import CircleIcon from "@mui/icons-material/Circle";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import { TaskForm } from "./TaskForm";

export const TaskDetail = (taskId) => {
  const {
    data: rawList = [],
    isLoading: loadingTask,
    error: error,
  } = useDetailTaskQuery(taskId.taskId);

  const [editOpen, setEditOpen] = React.useState(false);

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const onEditClick = () => {
    setEditOpen(true);
  };

  const icon = () => {
    if (rawList.priority == "Low") {
      return (
        <WarningRoundedIcon
          fontSize="small"
          sx={{ color: "green" }}
        ></WarningRoundedIcon>
      );
    } else if (rawList.priority == "Medium") {
      return (
        <WarningRoundedIcon
          fontSize="small"
          sx={{ color: "yellow" }}
        ></WarningRoundedIcon>
      );
    } else {
      return (
        <WarningRoundedIcon
          fontSize="small"
          sx={{ color: "red" }}
        ></WarningRoundedIcon>
      );
    }
  };

  return (
    <>
      <Box sx={{ marginTop: 2, borderBottom: "#d9d9d9 solid  1px" }}>
        <DialogTitle
          //  align="center"
          sx={{ fontSize: 25, marginLeft: 2 }}
        >
          Task Details
        </DialogTitle>
      </Box>

      <Box sx={{ width: 500, height: 400, padding: 1, marginTop: 3 }}>
        <DialogContent>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"flex-end"}
            sx={{ height: 300 }}
          >
            <Box sx={{ padding: 1 }}>
              <Grid container spacing={4}>
                <Grid item xs={8}>
                  <Box sx={{}}>
                    <Typography variant="h5" gutterBottom>
                      <WorkOutlineRoundedIcon
                        fontSize="small"
                        color="secondary"
                        sx={{ marginRight: 1 }}
                      ></WorkOutlineRoundedIcon>
                      {rawList.name}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  {/* {icon()} */}
                  <Typography sx={{ color: "#6e6e6e" }}>
                    {icon()}
                    Priority: {rawList.priority}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ color: "#6e6e6e" }}>
                    {rawList.description}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            {/* <Box>
              <Button onClick={onEditClick}>Edit</Button>
            </Box> */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onEditClick}>Edit</Button>
        </DialogActions>
      </Box>
      <Dialog open={editOpen} onClose={handleEditClose}>
        <TaskForm taskId={taskId.taskId}></TaskForm>
      </Dialog>
    </>
  );
};
