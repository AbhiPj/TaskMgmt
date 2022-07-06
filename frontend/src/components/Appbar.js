import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ButtonGroup, createTheme, Stack, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { Button } from "@mui/material";
import { Button } from "@material-ui/core";

export const CustomAppbar = (props) => {
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
            ></IconButton>
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
