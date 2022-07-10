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
import { TaskBucket } from "./screens/taskScreen/taskComponent/TaskBucket";
import { BucketTaskScreen } from "./screens/bucketScreen/BucketTaskScreen";
import { Checklist } from "./screens/checklistScreen/Checklist";
import { ChecklistTask } from "./screens/checklistScreen/ChecklistTask";
// import { TaskTable } from "./screens/taskScreen/taskComponent/TaskTable";

export const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route path="dashboard" element={<DashboardScreen />} />
            <Route path="task/bucket" element={<TaskBucket />} />
            <Route path="board" element={<Boards />} />
            <Route path="chart" element={<Chart />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="bucket" element={<Bucket />} />
            <Route path="checklist" element={<Checklist />} />
            <Route path="bucket/task/:id" element={<BucketTaskScreen />} />
            <Route path="checklist/task/:id" element={<ChecklistTask />} />

            {/* <Route path="bucket/table" element={<TaskTable />} /> */}
            {/* <Route path="task/individual" element={<Bucket />} /> */}
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
