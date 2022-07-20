import * as React from "react";
import Box from "@mui/material/Box";

import { Button, ButtonGroup, createTheme, Divider, OutlinedInput, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useListUserQuery } from "../state/userSlice";
import { useListBucketQuery } from "../state/bucketSlice";
import { TaskBoard } from "../screens/boardScreen/boardComponent/TaskBoard";
import { UserBoard } from "../screens/boardScreen/boardComponent/UserBoard";
import { BucketBoard } from "../screens/boardScreen/boardComponent/BucketBoard";
import { ChartGroup } from "../screens/chartScreen/chartComponent/ChartGroup";
import { ScheduleFilter } from "../screens/scheduleScreen/scheduleComponent/ScheduleFilter";
import { ChecklistBoard } from "../screens/boardScreen/boardComponent/ChecklistBoard";
import { useListChecklistQuery } from "../state/checklistSlice";

export const FilterAppBar = (props) => {
  const getTask = sessionStorage.getItem("taskType");

  if (getTask == null) {
    sessionStorage.setItem("taskType", "unassigned");
  }

  const { data: userList = [], isLoading: loadingUser } = useListUserQuery();
  const { data: bucketList = [], isLoading: loadingBucket } = useListBucketQuery();
  const { data: checklistTask = [], isLoading: loadingChecklist } = useListChecklistQuery();

  var userArr = [];
  var bucketArr = [];
  var checklistArr = [];

  if (!loadingBucket) {
    bucketList.map((item) => {
      bucketArr.push(item.name);
    });
  }
  if (!loadingUser) {
    userList.map((item) => {
      // if (item.department == "IT") {
      userArr.push(item.name);
      // }
    });
  }
  if (!loadingChecklist) {
    checklistTask.map((item) => {
      // if (item.department == "IT") {
      checklistArr.push(item.name);
      // }
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

  const [data, setData] = React.useState(["Low", "Medium", "High", "None"]);

  function getStyles(name, filterTask, theme) {
    return {
      fontWeight:
        filterTask.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const [filterTask, setFilterTask] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilterTask(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [group, setGroup] = React.useState("priority");
  const [taskType, setTaskType] = React.useState(getTask);

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

  const links = [
    {
      title: "list",
      path: "/list",
    },
    {
      title: "board",
      path: "/board",
    },
    {
      title: "chart",
      path: "/chart",
    },
    {
      title: "schedule",
      path: "/schedule",
    },
  ];

  function renderComponent() {
    if (props.component == "Board") {
      if (group == "priority") {
        return <TaskBoard data={filterTask}></TaskBoard>;
      } else if (group == "assignedTo") {
        return <UserBoard data={filterTask}></UserBoard>;
      } else if (group == "bucket") {
        return <BucketBoard data={filterTask}></BucketBoard>;
      } else if (group == "checklist") {
        return <ChecklistBoard data={filterTask}></ChecklistBoard>;
      }
    } else if (props.component == "Chart") {
      return <ChartGroup></ChartGroup>;
    } else if (props.component == "Schedule") {
      return <ScheduleFilter></ScheduleFilter>;
    }
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 0.4,
          width: "100%",
        }}
      >
        <FormControl sx={{ width: 120, marginLeft: 2 }} size="small">
          <InputLabel sx={{ color: "inherit" }} id="demo-select-small">
            Task Type
          </InputLabel>
          <Select
            sx={{ color: "inherit", height: 30, fontSize: 12 }}
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
            <MenuItem value={"checklist"}> Checklist</MenuItem>
            <MenuItem value={"unassigned"}>Unassigned</MenuItem>
            <MenuItem value={"bucket"}> Buckets</MenuItem>
            {/* <MenuItem value={"checklist"}> Checklist</MenuItem> */}
          </Select>
        </FormControl>
        <Stack direction="row" spacing={1}>
          {props.component == "Board" ? (
            <>
              <FormControl sx={{ width: 150 }} size="small">
                <Select
                  sx={{ color: "inherit", height: 30, fontSize: 12 }}
                  multiple
                  displayEmpty
                  value={filterTask}
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
                    <MenuItem key={name} value={name} style={getStyles(name, filterTask, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                //  sx={{ m: 1, minWidth: 150, marginRight: 2 }}
                size="small"
              >
                <InputLabel sx={{ color: "inherit" }} id="demo-select-small">
                  Group By
                </InputLabel>
                <Select
                  sx={{ color: "inherit", height: 30, fontSize: 12 }}
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
                    } else if (e.target.value == "checklist") {
                      setData(checklistArr);
                    }
                  }}
                >
                  {taskType == "checklist" ? (
                    <MenuItem value={"checklist"}> Checklist</MenuItem>
                  ) : (
                    <></>
                  )}
                  {taskType == "bucket" ? <MenuItem value={"bucket"}> Bucket</MenuItem> : <></>}
                  <MenuItem value={"priority"}>Priority</MenuItem>
                  <MenuItem value={"assignedTo"}>Assigned To</MenuItem>
                  {/* <MenuItem value={"bucket"}> Bucket</MenuItem> */}
                  {/* <MenuItem value={"checklist"}> Checklist</MenuItem> */}
                </Select>
              </FormControl>
            </>
          ) : (
            <></>
          )}

          {/* <ButtonGroup variant="standard" aria-label="outlined button group"> */}
          {links.map(({ title, path }) => (
            <Link style={{ textDecoration: "none", color: "inherit" }} key={title} to={path}>
              <Button sx={{ fontSize: 12 }} color="inherit">
                {title}
              </Button>
            </Link>
          ))}
          {/* </ButtonGroup> */}
        </Stack>
      </Box>
      <Divider sx={{ marginBottom: 1 }}></Divider>
      <Box sx={{}}>{renderComponent()}</Box>
    </>
  );
};
