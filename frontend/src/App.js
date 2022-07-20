import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
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
import { NotFound } from "./screens/NotFound";

export const App = () => {
  return (
    <>
      {/* <Router> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="list" element={<DashboardScreen />} />
          <Route path="board" element={<Boards />} />
          <Route path="chart" element={<Chart />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="bucket" element={<Bucket />} />
          <Route path="checklist" element={<Checklist />} />
          <Route path="bucket/task/:id" element={<BucketTaskScreen />} />
          <Route path="checklist/task/:id" element={<ChecklistTask />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {/* </Router> */}
    </>
  );
};

function Layout() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#F2f3f5",
          minHeight: "100vh",
          height: "auto",
          // padding: 1,
        }}
      >
        <Sidebar />
        <Box
          // backgroundColor="white"
          component="main"
          mt={4}
          // mx={2}
          sx={{ flexGrow: 1, paddingY: 4 }}
        >
          <Outlet />
        </Box>
        {/* <Footer /> */}
      </Box>
    </>
  );
}

export default App;
