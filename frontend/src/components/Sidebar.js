import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import TaskIcon from "@mui/icons-material/Task";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import WorkIcon from "@mui/icons-material/Work";
import { useNavigate } from "react-router-dom";

export function Sidebar() {
  const drawerWidth = 240;
  let navigate = useNavigate();

  const taskRoute = (a) => {
    let path = `/dashboard`;
    navigate(path);
  };

  const bucketRoute = (a) => {
    let path = `/bucket`;
    navigate(path);
  };

  const checklistRoute = (a) => {
    let path = `/checklist`;
    navigate(path);
  };

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem key={"Task"} disablePadding onClick={taskRoute}>
              <ListItemButton>
                <ListItemIcon>
                  <TaskIcon />
                </ListItemIcon>
                <ListItemText primary={"Task"} />
              </ListItemButton>
            </ListItem>

            <ListItem key={"Buckets"} disablePadding onClick={bucketRoute}>
              <ListItemButton>
                <ListItemIcon>
                  <AccountTreeIcon />
                </ListItemIcon>
                <ListItemText primary={"Buckets"} />
              </ListItemButton>
            </ListItem>

            <ListItem key={"Checklist"} disablePadding onClick={checklistRoute}>
              <ListItemButton>
                <ListItemIcon>
                  <PlaylistAddCheckIcon />
                </ListItemIcon>
                <ListItemText primary={"Checklist"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Sidebar;
