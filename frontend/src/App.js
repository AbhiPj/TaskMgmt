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
import { Schedule } from "./screens/scheduleScreen/Schedule";
import { Bucket } from "./screens/bucketScreen/Bucket";
import { BucketTaskScreen } from "./screens/bucketScreen/BucketTaskScreen";
import { Checklist } from "./screens/checklistScreen/Checklist";
import { ChecklistTask } from "./screens/checklistScreen/ChecklistTask";
import { Case } from "./screens/caseScreen/Case";
import { CaseTaskScreen } from "./screens/caseScreen/CaseTaskScreen";

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
            <Route path="bucket" element={<Bucket />} />
            <Route path="checklist" element={<Checklist />} />
            <Route path="bucket/task/:id" element={<BucketTaskScreen />} />
            <Route path="checklist/task/:id" element={<ChecklistTask />} />

            <Route path="case" element={<Case />} />
            <Route path="case/task/:id" element={<CaseTaskScreen />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

function Layout() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F2f3f5",
          minHeight: "100vh",
          height: "auto",
          padding: 1,
        }}
      >
        <Sidebar />
        <Outlet />
        {/* <Footer /> */}
      </Box>
    </>
  );
}

export default App;
