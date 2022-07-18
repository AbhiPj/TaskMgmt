import React from "react";
import { Box, Grid } from "@mui/material";
import { BarChart, BarChart2, PieChart } from "./chartComponent/chart";
import {
  useListDepartmentTaskQuery,
  useListTaskQuery,
} from "../../state/taskSlice";
import { CustomAppbar } from "../../components/Appbar";
import { FilterAppBar } from "../../components/FilterAppBar";
export const Chart = () => {
  const taskType = sessionStorage.getItem("taskType");

  const { data: allList = [], isLoading: loadingTask } = useListTaskQuery();

  // const dept = "IT";
  // const {
  //   data: rawList = [],
  //   isLoading: loadingTask,
  //   error: error,
  // } = useListDepartmentTaskQuery(dept);

  var rawList = [];

  if (taskType == "unassigned") {
    allList.map((item) => {
      if (item.sourceModel == "Unassigned") {
        rawList.push(item);
      }
    });
  } else if (taskType == "bucket") {
    allList.map((item) => {
      if (item.sourceModel == "Bucket") {
        rawList.push(item);
      }
    });
  } else if (taskType == "checklist") {
    allList.map((item) => {
      if (item.sourceModel == "Checklist") {
        rawList.push(item);
      }
    });
  }

  var userGroup = [];
  var taskCompletion = [];
  var result = [];

  if (!loadingTask) {
    const groupBy = (array, key) => {
      return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      }, {}); //
    };

    result = groupBy(rawList, "priority");
    userGroup = groupBy(rawList, "assignedTo");
    taskCompletion = groupBy(rawList, "progress");
  }
  const chartData = {
    result: result,
    userGroup: userGroup,
    taskCompletion: taskCompletion,
  };
  return (
    <>
      {loadingTask ? (
        "Loading... "
      ) : (
        <>
          <Box sx={{}}>
            <CustomAppbar></CustomAppbar>
          </Box>
          <Box sx={{}}>
            <FilterAppBar component={"Chart"}></FilterAppBar>
          </Box>
          {/* <Box>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Box>
                    <BarChart datas={result}></BarChart>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box>
                    <PieChart data={taskCompletion}></PieChart>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box>
                    <BarChart2 data={userGroup}></BarChart2>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box> */}
        </>
      )}
    </>
  );
};
