import React, { useState } from "react";
import { TaskBoard } from "./boardComponent/TaskBoard";
import { createTheme, Stack, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button } from "@material-ui/core";
import { UserBoard } from "./boardComponent/UserBoard";
import { ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BucketBoard } from "./boardComponent/BucketBoard";
import OutlinedInput from "@mui/material/OutlinedInput";

import { useListUserQuery } from "../../state/userSlice";
import { useListBucketQuery } from "../../state/bucketSlice";

export const Boards = () => {
  const getTask = sessionStorage.getItem("taskType");
  if (getTask == null) {
    sessionStorage.setItem("taskType", "unassigned");
  }

  const { data: userList = [], isLoading: loadingUser } = useListUserQuery();
  const { data: bucketList = [], loadingBucket } = useListBucketQuery();

  var userArr = [];
  var bucketArr = [];

  if (!loadingBucket) {
    bucketList.map((item) => {
      bucketArr.push(item.name);
    });
  }
  if (!loadingUser) {
    userList.map((item) => {
      if (item.department == "IT") {
        userArr.push(item.name);
      }
    });
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [data, setData] = React.useState(["Low", "Medium", "High"]);

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // console.log(personName, "person state");

  let navigate = useNavigate();

  const listRoute = (a) => {
    let path = `/dashboard`;
    navigate(path);
  };

  const chartRoute = (a) => {
    let path = `/chart`;
    navigate(path);
  };

  const boardRoute = (a) => {
    let path = `/board`;
    navigate(path);
  };

  const scheduleRoute = (a) => {
    let path = `/schedule`;
    navigate(path);
  };

  const [group, setGroup] = React.useState("priority");
  const [taskType, setTaskType] = React.useState(getTask);

  function renderBoard() {
    if (group == "priority") {
      return <TaskBoard data={personName}></TaskBoard>;
    } else if (group == "assignedTo") {
      return <UserBoard data={personName}></UserBoard>;
    } else if (group == "bucket") {
      return <BucketBoard data={personName}></BucketBoard>;
    }
  }
  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        main: "#0971f1",
        darker: "#053e85",
      },
      secondary: {
        main: "#ffffff",
        darker: "#053e85",
      },
      neutral: {
        main: "#8b66b7",
        contrastText: "#fff",
      },
    },
  });

  return (
    <>
      <Box sx={{ marginTop: 16 }}>
        <ThemeProvider theme={theme}>
          <AppBar
            color="neutral"
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                {/* <MenuIcon /> */}
              </IconButton>
              <Typography variant="h6" component="div">
                TaskManager
              </Typography>
              <FormControl
                sx={{ m: 1, width: 150, marginRight: 50, marginLeft: 12 }}
                size="small"
              >
                <InputLabel sx={{ color: "inherit" }} id="demo-select-small">
                  Task Type
                </InputLabel>
                <Select
                  sx={{ color: "inherit" }}
                  labelId="demo-simple-select-label"
                  id="demo-select-small"
                  value={taskType}
                  label="Priority"
                  onChange={(e) => {
                    setTaskType(e.target.value);
                    if (e.target.value == "unassigned") {
                      sessionStorage.setItem("taskType", "unassigned");
                    } else if (e.target.value == "bucket") {
                      sessionStorage.setItem("taskType", "bucket");
                    } else if (e.target.value == "checklist") {
                      sessionStorage.setItem("taskType", "checklist");
                    }
                  }}
                >
                  <MenuItem value={"unassigned"}>unassigned</MenuItem>
                  <MenuItem value={"bucket"}> Buckets</MenuItem>
                  <MenuItem value={"checklist"}> Checklist</MenuItem>
                </Select>
              </FormControl>
              <Stack direction="row-reverse" color="#f5f5f5">
                <ButtonGroup
                  variant="standard"
                  aria-label="outlined button group"
                >
                  <Button color="inherit" onClick={listRoute}>
                    List
                  </Button>
                  <Button color="inherit" onClick={boardRoute}>
                    Board
                  </Button>
                  <Button color="inherit" onClick={chartRoute}>
                    Chart
                  </Button>
                  <Button color="inherit" onClick={scheduleRoute}>
                    Schedule
                  </Button>
                </ButtonGroup>
                <FormControl
                  sx={{ m: 1, width: 150, marginRight: 2 }}
                  size="small"
                >
                  <Select
                    sx={{ color: "inherit" }}
                    multiple
                    displayEmpty
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Filter</em>;
                      }

                      return selected.join(", ");
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="">
                      <em>Placeholder</em>
                    </MenuItem>
                    {data.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  sx={{ m: 1, minWidth: 150, marginRight: 2 }}
                  size="small"
                >
                  <InputLabel sx={{ color: "inherit" }} id="demo-select-small">
                    Group By
                  </InputLabel>
                  <Select
                    sx={{ color: "inherit" }}
                    labelId="demo-simple-select-label"
                    id="demo-select-small"
                    value={group}
                    label="Priority"
                    onChange={(e) => {
                      setGroup(e.target.value);
                      if (e.target.value == "priority") {
                        setData(["High", "Medium", "Low"]);
                      } else if (e.target.value == "assignedTo") {
                        setData(userArr);
                      } else if (e.target.value == "bucket") {
                        setData(bucketArr);
                      }
                    }}
                  >
                    <MenuItem value={"priority"}>Priority</MenuItem>
                    <MenuItem value={"assignedTo"}>Assigned To</MenuItem>
                    <MenuItem value={"bucket"}> Bucket</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </Box>

      <Box
        sx={{
          width: 880,
          marginLeft: 40,
        }}
      >
        {/* <Stack direction="row-reverse" sx={{ marginTop: 1, marginBottom: 1 }}>
          <Box>aaa</Box>
        </Stack> */}
        {/* <TaskBoard></TaskBoard> */}
        {/* <UserBoard></UserBoard> */}
        {renderBoard()}
      </Box>
    </>
  );
};
