import "./App.css";

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Box } from "@mui/material";
import { DashboardScreen } from "./screens/DashboardScreen";
import { Boards } from "./screens/boardScreen/Board";
import { Chart } from "./screens/chartScreen/Chart";
import { BottomDrawer } from "./screens/boardScreen/boardComponent/BottomDrawer";
import { Schedule } from "./screens/scheduleScreen/Schedule";

export const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route path="dashboard" element={<DashboardScreen />} />
            <Route path="board" element={<Boards />} />
            <Route path="chart" element={<Chart />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="drawer" element={<BottomDrawer />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

function Layout() {
  return (
    <>
      <Box>
        <Sidebar />
        <Outlet />
        {/* <Footer /> */}
      </Box>
    </>
  );
}

export default App;
