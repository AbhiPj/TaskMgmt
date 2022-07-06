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

  var userGroup = [];
  var taskCompletion = [];
  var result = [];

  const {
    data: rawList = [],
    isLoading: loadingTask,
    error: error,
  } = useListDepartmentTaskQuery(dept);

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
