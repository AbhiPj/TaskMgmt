import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Grid,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/system";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import {
  useDetailTaskQuery,
  useEditTaskMutation,
} from "../../../state/taskSlice";

import { useListUserQuery } from "../../../state/userSlice";

export const TaskForm = (taskId) => {
  const { data: userList = [], isLoading: loadingUser } = useListUserQuery();
  const {
    data: detailTask = [],
    isLoading: loadingTask,
    error: error,
  } = useDetailTaskQuery(taskId.taskId);

  if (!loadingTask) {
    console.log(detailTask, "detailTas");
    //   const {
    //     data: detailUser = [],
    //     isLoading: loadingDetailUser,
    //     error: error,
    //   } = useDetailUserQuery(detailTask.);
  }

  const [task, setTask] = useState("");
  const [description, setDescription] = useState();
  const [comment, setComment] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [progress, setProgress] = useState("NotStarted");
  const [startDate, setStartDate] = React.useState(Date.now());
  const [endDate, setEndDate] = React.useState();

  useEffect(() => {
    setTask(detailTask.name);
    setDescription(detailTask.description);
    setPriority(detailTask.priority);
    setAssignedTo(detailTask.assignedTo);
    setEndDate(detailTask.dateDue);
  }, [loadingTask]);

  // if (!loadingTask) {
  //   setTask(rawList.name);
  //   setDescription(rawList.description);
  //   setPriority(rawList.priority);
  // }

  const [editTask] = useEditTaskMutation();

  const handleSubmit = () => {
    const updatedTask = {
      id: taskId.taskId,
      body: {
        name: task,
        description: description,
        priority: priority,
        assignedTo: assignedTo,
        dateDue: endDate,
        startDate: startDate,
        progress: progress,
      },
    };
    console.log(updatedTask);
    editTask(updatedTask);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  return (
    <>
      {loadingTask ? (
        "Loading... "
      ) : (
        <Box sx={{ padding: 6, marginTop: 1 }}>
          <Box width={500} margin={"auto"}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Task"
                  // variant="standard"
                  size="small"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Assigned To
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    size="small"
                    id="demo-simple-select"
                    value={assignedTo}
                    label="assignedTo"
                    onChange={(e) => setAssignedTo(e.target.value)}
                  >
                    {userList.map((item) => {
                      return <MenuItem value={item.name}>{item.name}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Progress
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={progress}
                    size="small"
                    label="progress"
                    onChange={(e) => setProgress(e.target.value)}
                  >
                    <MenuItem value={"NotStarted"}>Not Started</MenuItem>
                    <MenuItem value={"Ongoing"}>Ongoing</MenuItem>
                    <MenuItem value={"Completed"}>Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Priority
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    size="small"
                    id="demo-simple-select"
                    value={priority}
                    label="Priority"
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <MenuItem value={"Low"}>Low</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"High"}>High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Start Date"
                    size="small"
                    inputFormat="MM/dd/yyyy"
                    value={startDate}
                    onChange={handleStartDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    size="large"
                    label="End date"
                    inputFormat="MM/dd/yyyy"
                    value={endDate}
                    onChange={handleEndDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  sx={{ marginTop: 3, marginBottom: 2 }}
                >
                  Notes :
                </Typography>
                <TextareaAutosize
                  style={{
                    width: "100%",
                    height: "100px",
                    fontFamily: "Helvetica",
                  }}
                  fullWidth
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Divider></Divider>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  sx={{ marginTop: 1, marginBottom: 2 }}
                >
                  Add Comment :
                </Typography>
                <TextareaAutosize
                  style={{
                    width: "100%",
                    height: "100px",
                    fontFamily: "Helvetica",
                  }}
                  fullWidth
                  label="Description"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Grid>
            </Grid>
            <Stack
              display={"flex"}
              direction={"row-reverse"}
              spacing={2}
              mt={2}
              padding={2}
            >
              <Button variant="outlined" onClick={handleSubmit}>
                Update
              </Button>
            </Stack>
          </Box>
        </Box>
      )}
    </>
  );
};
