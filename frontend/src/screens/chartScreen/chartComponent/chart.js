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
      display: true,
      text: "User Chart",
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

export const userOption = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: " User Task Chart",
    },
  },
};

export const BarChart = (datas) => {
  const priorityArr = ["High", "Medium", "Low"];
  var priorityData = [];

  priorityArr.map((item) => {
    if (!datas.datas[item]) {
      datas.datas[item] = [];
    }
  });

  var labels = [];

  Object.entries(datas.datas).map(([key, value]) => {
    labels.push(key);
    priorityData.push(value.length);
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Task Priority",
        data: priorityData,
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
  const labels = [];
  var data = {};
  var userTask = [];

  userList.map((item) => {
    if (!userGroup.data[item.name]) {
      userGroup.data[item.name] = [];
    }
  });

  if (!loadingUser) {
    Object.entries(userGroup.data).map(([key, value]) => {
      userTask.push(value.length);
      labels.push(key);
    });

    data = {
      labels,
      datasets: [
        {
          label: "Users",
          data: userTask,
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderRadius: 10,
          barPercentage: 0.06,
        },
      ],
    };
  }

  return (
    <>
      {loadingUser ? (
        "Loading... "
      ) : (
        <>
          <Paper elevation={3}>
            <Box sx={{ padding: 3 }}>
              <Bar height={400} width={800} data={data} options={userOption} />
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

export const PieChart = (taskCompletion) => {
  var completionArr = [];
  var labels = [];

  var taskCompletionList = ["Completed", "Ongoing", "Not started"];

  taskCompletionList.map((item) => {
    if (!taskCompletion.data[item]) {
      taskCompletion.data[item] = [];
    }
  });

  Object.entries(taskCompletion.data).map(([key, value]) => {
    completionArr.push(value.length);
    labels.push(key);
  });

  var data = {
    labels,
    datasets: [
      {
        label: "#",
        data: completionArr,
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

  return (
    <>
      <Paper elevation={3}>
        <Box sx={{ padding: 4, height: 460 }}>
          <Doughnut data={data} options={taskOption} />
        </Box>
      </Paper>
    </>
  );
};
