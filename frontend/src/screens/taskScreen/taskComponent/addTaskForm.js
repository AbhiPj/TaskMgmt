import React, { useState, useEffect } from "react";
import { Button, Divider, Grid, Stack, TextareaAutosize, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/system";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useEditTaskMutation, useAddTaskMutation } from "../../../state/taskSlice";

import { useListBucketQuery } from "../../../state/bucketSlice";
import { useListUserQuery } from "../../../state/userSlice";

export const AddTaskForm = (data) => {
  const { data: userList = [], isLoading: loadingUser } = useListUserQuery();
  const { data: bucketList = [], isLoading: loadingBucket } = useListBucketQuery();

  const [addTask] = useAddTaskMutation();

  const [task, setTask] = useState("");
  const [description, setDescription] = useState();
  const [department, setDepartment] = useState();
  const [bucket, setBucket] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [progress, setProgress] = useState("");
  const [startDate, setStartDate] = React.useState(new Date(data?.date?.startDate));
  const [endDate, setEndDate] = React.useState(new Date(data.date?.endDate));

  const handleSubmit = () => {
    var taskType = "Unassigned";
    if (bucket != "") {
      taskType = "Bucket";
    }
    const addTaskObj = {
      sourceInfo: bucket,
      sourceModel: taskType,
      name: task,
      description: description,
      priority: priority,
      assignedTo: assignedTo,
      dueDate: endDate,
      startDate: startDate,
      progress: progress,
      department: department,
      bucket: bucket,
    };
    addTask(addTaskObj);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  return (
    <>
      <Box sx={{ padding: 3, marginTop: 1 }}>
        <Box width={500} margin={"auto"}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 13 } }}
                fullWidth
                label="Task"
                size="small"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Assigned To</InputLabel>
                <Select
                  sx={{
                    height: 40,
                    fontSize: 14,
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  variant="filled"
                  value={assignedTo}
                  size="small"
                  label="assignedTo"
                  onChange={(e) => setAssignedTo(e.target.value)}
                >
                  {userList.map((item) => {
                    return <MenuItem value={item._id}>{item.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                <Select
                  sx={{
                    height: 40,
                    fontSize: 14,
                  }}
                  labelId="demo-simple-select-label"
                  variant="filled"
                  size="small"
                  id="demo-simple-select"
                  value={department}
                  label="Priority"
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <MenuItem value={"IT"}>IT</MenuItem>
                  <MenuItem value={"Finance"}>Finance</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Progress</InputLabel>
                <Select
                  sx={{
                    height: 40,
                    fontSize: 14,
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  variant="filled"
                  value={progress}
                  size="small"
                  label="progress"
                  onChange={(e) => setProgress(e.target.value)}
                >
                  <MenuItem value={"Not started"}>Not Started</MenuItem>
                  <MenuItem value={"Ongoing"}>Ongoing</MenuItem>
                  <MenuItem value={"Completed"}>Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Bucket</InputLabel>
                <Select
                  sx={{
                    height: 40,
                    fontSize: 14,
                  }}
                  variant="filled"
                  labelId="demo-simple-select-label"
                  size="small"
                  id="demo-simple-select"
                  value={bucket}
                  label="Bucket"
                  onChange={(e) => setBucket(e.target.value)}
                >
                  {bucketList.map((item) => {
                    return <MenuItem value={item._id}>{item.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                <Select
                  sx={{
                    height: 40,
                    fontSize: 14,
                  }}
                  variant="filled"
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
                  renderInput={(params) => (
                    <TextField
                      variant="filled"
                      inputProps={{ style: { fontSize: 15 } }}
                      InputLabelProps={{ style: { fontSize: 13 } }}
                      {...params}
                    />
                  )}
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
                  renderInput={(params) => (
                    <TextField
                      variant="filled"
                      InputLabelProps={{ style: { fontSize: 13 } }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" sx={{ marginTop: 1, marginBottom: 1 }}>
                Notes :
              </Typography>
              <TextareaAutosize
                style={{
                  width: "100%",
                  height: "100px",
                  fontFamily: "Helvetica",
                  backgroundColor: "rgba(230,230,230,0.6)",
                  border: "none",
                }}
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Stack
                display={"flex"}
                direction={"row-reverse"}
                spacing={2}
                mt={2}
                mb={3}
                padding={2}
              >
                <Button variant="outlined" onClick={handleSubmit}>
                  Submit
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* )} */}
    </>
  );
};
