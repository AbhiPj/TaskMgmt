import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useListUserQuery } from "../../../state/userSlice";
import { useListBucketQuery } from "../../../state/bucketSlice";
import { useDetailTaskQuery } from "../../../state/taskSlice";
import {
  useDetailChecklistTaskQuery,
  useEditChecklistTaskMutation,
} from "../../../state/checklistTaskSlice";
export const EditChecklistTask = (taskId) => {
  console.log(taskId, "taskId");
  const { data: userList = [], isLoading: loadingUser } = useListUserQuery();
  const { data: bucketList = [], isLoading: loadingBucket } =
    useListBucketQuery();

  const { data: detailTask = [], isLoading: loadingTask } =
    useDetailChecklistTaskQuery(taskId?.id);

  const [editChecklistTask] = useEditChecklistTaskMutation();

  // const {
  //   data: detailTask = [],
  //   isLoading: loadingTask,
  //   error: error,
  // } = useDetailTaskQuery(taskId?.id);
  console.log(taskId.id, "id task");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState();
  const [comment, setComment] = useState("");
  const [priority, setPriority] = useState("");
  const [bucket, setBucket] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [progress, setProgress] = useState("");
  const [startDate, setStartDate] = React.useState(new Date(Date.now()));
  const [endDate, setEndDate] = React.useState();

  // useEffect(() => {
  //   setName(detailTask.name);
  //   setDescription(detailTask.description);
  //   setBucket(detailTask.bucket);
  //   setProgress(detailTask.progress);
  //   setPriority(detailTask.priority);
  //   setAssignedTo(detailTask.assignedTo);
  //   setEndDate(detailTask.dueDate);
  // }, [loadingTask]);

  const handleSubmit = () => {
    const checklistObj = {
      checklistId: taskId.checklistId,
      task: {
        id: taskId?.id,
        checklistTask: {
          name: name,
          description: description,
          priority: priority,
          assignedTo: assignedTo,
          // dueDate: endDate,
          // startDate: startDate,
          progress: progress,
          department: department,
          bucket: bucket,
        },
      },
    };
    editChecklistTask(checklistObj);
  };
  return (
    <>
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
                  label="Name"
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Assigned To
                  </InputLabel>
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
                  <InputLabel id="demo-simple-select-label">
                    Department
                  </InputLabel>
                  <Select
                    sx={{
                      height: 40,
                      fontSize: 14,
                    }}
                    variant="filled"
                    labelId="demo-simple-select-label"
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
                  <InputLabel id="demo-simple-select-label">
                    Progress
                  </InputLabel>
                  <Select
                    sx={{
                      // backgroundColor: "rgba(230,230,230,0.6)",
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
                  <InputLabel id="demo-simple-select-label">
                    Priority
                  </InputLabel>
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
                      return <MenuItem value={item.name}>{item.name}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  sx={{ marginTop: 1, marginBottom: 1 }}
                >
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
    </>
  );
};
