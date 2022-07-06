import React from "react";
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

export const Boards = () => {
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

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  const [group, setGroup] = React.useState("priority");

  const handleChange = (event) => {
    setGroup(event.target.value);
  };

  function renderBoard() {
    // console.log(group, "grou");
    if (group == "priority") {
      return <TaskBoard></TaskBoard>;
    } else if (group == "assignedTo") {
      return <UserBoard></UserBoard>;
    } else if (group == "bucket") {
      return <BucketBoard></BucketBoard>;
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
        {/* <CustomAppbar></CustomAppbar> */}
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
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                TaskManager
              </Typography>
              {/* <Button color="inherit">Login</Button> */}
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
                    onChange={(e) => setGroup(e.target.value)}
                  >
                    <MenuItem value={"priority"}>Priority</MenuItem>
                    <MenuItem value={"assignedTo"}>Assigned To</MenuItem>
                    <MenuItem value={"bucket"}> Bucket</MenuItem>

                    {/* <MenuItem value={"High"}>High</MenuItem> */}
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
