import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { ButtonGroup, createTheme, Stack, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { Button } from "@mui/material";
import { Button } from "@material-ui/core";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const CustomAppbar = (props) => {
  const getTask = sessionStorage.getItem("taskType");
  if (getTask == null) {
    sessionStorage.setItem("taskType", "unassigned");
  }
  const [taskType, setTaskType] = React.useState(getTask);

  let navigate = useNavigate();

  const listRoute = (a) => {
    let path = `/dashboard`;
    navigate(path);
  };

  const chartRoute = (a) => {
    let path = `/chart`;
    navigate(path);
  };

  const scheduleRoute = (a) => {
    let path = `/schedule`;
    navigate(path);
  };

  const boardRoute = (a) => {
    let path = `/board`;
    navigate(path);
  };

  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        main: "#ffffff",
        darker: "#053e85",
      },
      secondary: {
        main: "#8b66b7",
        darker: "#053e85",
      },
      neutral: {
        main: "#8b66b7",
        contrastText: "#fff",
      },
    },
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar
          color="neutral"
          // position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: 50 }}
        >
          <Toolbar sx={{ height: 10 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TaskManager
            </Typography>

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
            </Stack>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
};

{
  /* <FormControl
              sx={{ m: 1, width: 150, marginRight: 95, marginLeft: 10 }}
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
                <MenuItem value={"unassigned"}>Unassigned</MenuItem>
                <MenuItem value={"bucket"}> Buckets</MenuItem>
                <MenuItem value={"checklist"}> Checklist</MenuItem>
              </Select>
            </FormControl> */
}
