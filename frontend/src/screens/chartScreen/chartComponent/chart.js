import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { Paper } from "@material-ui/core";
import { Box } from "@mui/system";
import { useListUserQuery } from "../../../state/userSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const priorityOption = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      // text: "User Chart",
    },
  },
};

export const taskOption = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: " Task Completion Chart",
    },
  },
};

export const BarChart = (datas) => {
  const labels = ["High", "Medium", "Low"];

  const high = datas.datas.high.length;
  const medium = datas.datas.medium.length;
  const low = datas.datas.low.length;

  const data = {
    labels,
    datasets: [
      {
        label: "Task Priority",
        data: [high, medium, low],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderRadius: 8,
        barPercentage: 0.7,
      },
    ],
  };

  return (
    <>
      <Paper elevation={3}>
        <Box sx={{ padding: 3 }}>
          <Bar height={600} width={1000} data={data} options={priorityOption} />
        </Box>
      </Paper>
    </>
  );
};

export const BarChart2 = (userGroup) => {
  const { data: userList = [], isLoading: loadingUser } = useListUserQuery();
  var userArray = [];
  const labels = [];
  var data = {};
  var userTask = [];

  if (!loadingUser) {
    userList.map((item) => {
      labels.push(item.name);
    });

    const i = userGroup.data;

    Object.entries(i).map(([key, value]) => {
      userTask.push(value.length);
    });

    data = {
      labels,
      datasets: [
        {
          label: "Users",
          data: userTask,
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          // backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderRadius: 10,
          barPercentage: 0.06,
        },
      ],
    };
    // console.log(data, "barc2 data");
  }

  return (
    <>
      {loadingUser ? (
        "Loading... "
      ) : (
        <>
          <Paper elevation={3}>
            <Box sx={{ padding: 3 }}>
              <Bar
                height={400}
                width={800}
                data={data}
                options={priorityOption}
              />
            </Box>
          </Paper>
        </>
      )}
    </>
  );
};

export const pieData = {
  labels: ["Tasks Done", "Tasks Remaining", "In Progress"],
  datasets: [
    {
      label: "#",
      data: [12, 19, 4],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        // "rgba(255, 206, 86, 0.6)",
        // "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        // "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const PieChart = () => {
  return (
    <>
      <Paper elevation={3}>
        <Box sx={{ padding: 4, height: 460 }}>
          <Doughnut data={pieData} options={taskOption} />
        </Box>
      </Paper>
    </>
  );
};
