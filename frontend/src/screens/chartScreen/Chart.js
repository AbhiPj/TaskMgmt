import React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { BarChart, BarChart2, PieChart } from "./chartComponent/chart";
import {
  useListDepartmentTaskQuery,
  useListTaskQuery,
} from "../../state/taskSlice";
import { Container } from "@material-ui/core";
import { CustomAppbar } from "../../components/Appbar";
export const Chart = () => {
  // const { data: rawList = [], isLoading: loadingTask } = useListTaskQuery();

  const dept = "IT";

  const {
    data: rawList = [],
    isLoading: loadingTask,
    error: error,
  } = useListDepartmentTaskQuery(dept);

  var newLowArrayOfObj = [];
  var newHighArrayOfObj = [];
  var newMediumArrayOfObj = [];
  var userGroup = [];
  var taskCompletion = [];

  var datas = {};
  var result = [];

  if (!loadingTask) {
    const groupBy = (array, key) => {
      // Return the end result
      return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      }, {}); // empty object is the initial value for result object
    };

    result = groupBy(rawList, "priority");
    userGroup = groupBy(rawList, "assignedTo");
    taskCompletion = groupBy(rawList, "progress");

    // if (result.Low) {
    //   const low = [result.Low];
    //   const lowArrayOfObj = low[0];

    //   newLowArrayOfObj = lowArrayOfObj.map(
    //     ({ name: title, _id: id, description }) => ({
    //       title,
    //       id,
    //       description,
    //     })
    //   );
    //   // }
    // }

    // if (result.Medium) {
    //   const medium = [result.Medium];
    //   const mediumArrayOfObj = medium[0];

    //   newMediumArrayOfObj = mediumArrayOfObj.map(
    //     ({ name: title, _id: id, description }) => ({
    //       title,
    //       id,
    //       description,
    //     })
    //   );
    // }
    // if (result.High) {
    //   const high = [result.High];
    //   const highArrayOfObj = high[0];
    //   newHighArrayOfObj = highArrayOfObj.map(
    //     ({ name: title, _id: id, description }) => ({
    //       title,
    //       id,
    //       description,
    //     })
    //   );

    //   datas = {
    //     high: newHighArrayOfObj,
    //     medium: newMediumArrayOfObj,
    //     low: newLowArrayOfObj,
    //   };
    // }
  }
  return (
    <>
      {loadingTask ? (
        "Loading... "
      ) : (
        <>
          <Box sx={{ marginTop: 8 }}>
            <CustomAppbar></CustomAppbar>
          </Box>
          <Container>
            <Box sx={{ flexGrow: 1, marginTop: 10, marginLeft: 15 }}>
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
          </Container>
        </>
      )}
    </>
  );
};
