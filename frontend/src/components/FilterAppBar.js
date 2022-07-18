import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {
  Button,
  ButtonGroup,
  createTheme,
  Grid,
  OutlinedInput,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@material-ui/core";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useListUserQuery } from "../state/userSlice";
import { useListBucketQuery } from "../state/bucketSlice";
import { TaskBoard } from "../screens/boardScreen/boardComponent/TaskBoard";
import { UserBoard } from "../screens/boardScreen/boardComponent/UserBoard";
import { BucketBoard } from "../screens/boardScreen/boardComponent/BucketBoard";
import {
  BarChart2,
  BarChart,
  PieChart,
} from "../screens/chartScreen/chartComponent/chart";
import { ChartGroup } from "../screens/chartScreen/chartComponent/ChartGroup";

export const FilterAppBar = (props) => {
  const getTask = sessionStorage.getItem("taskType");

  if (getTask == null) {
    sessionStorage.setItem("taskType", "unassigned");
  }

  const { data: userList = [], isLoading: loadingUser } = useListUserQuery();
  const { data: bucketList = [], isLoading: loadingBucket } =
    useListBucketQuery();

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
        return <TaskBoard data={personName}></TaskBoard>;
      } else if (group == "assignedTo") {
        return <UserBoard data={personName}></UserBoard>;
      } else if (group == "bucket") {
        return <BucketBoard data={personName}></BucketBoard>;
      }
    } else if (props.component == "Chart") {
      return <ChartGroup></ChartGroup>;
    }
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 7,
        }}
      >
        <FormControl size="small">
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
            <MenuItem value={"unassigned"}>Unassigned</MenuItem>
            <MenuItem value={"bucket"}> Buckets</MenuItem>
            <MenuItem value={"checklist"}> Checklist</MenuItem>
          </Select>
        </FormControl>
        <Stack direction="row" spacing={2}>
          {props.component == "Board" ? (
            <>
              <FormControl sx={{ width: 150 }} size="small">
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
                //  sx={{ m: 1, minWidth: 150, marginRight: 2 }}
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
            </>
          ) : (
            <></>
          )}

          <ButtonGroup variant="standard" aria-label="outlined button group">
            {links.map(({ title, path }) => (
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                key={title}
                to={path}
              >
                <Button color="inherit">{title}</Button>
              </Link>
            ))}
          </ButtonGroup>
        </Stack>
      </Box>
      <Box sx={{ paddingLeft: 4, paddingTop: 0 }}>{renderComponent()}</Box>
    </>
  );
};
