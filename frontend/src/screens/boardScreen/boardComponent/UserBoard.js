import React from "react";
import {
  useEditTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useListTaskQuery,
} from "../../../state/taskSlice";
import Board from "react-trello";
import { useListUserQuery } from "../../../state/userSlice";
import { Box, Dialog, Drawer } from "@mui/material";
import { TaskDetail } from "../../taskScreen/taskComponent/TaskDetail";
import { TaskForm } from "../../taskScreen/taskComponent/TaskForm";
import styled from "@emotion/styled";

export const UserBoard = () => {
  const {
    data: rawList = [],
    isLoading: loadingTask,
    error: error,
  } = useListTaskQuery();

  const CustomeDrawer = styled(Drawer)(({ theme }) => ({
    "& .MuiPaper-root.MuiPaper-elevation.MuiPaper-elevation16.MuiDrawer-paper.MuiDrawer-paperAnchorBottom.css-9emuhu-MuiPaper-root-MuiDrawer-paper":
      {
        width: "750px",
        borderRadius: "10px 10px 0 0",
        margin: "auto",
        height: "520px",
      },
  }));

  const { data: userList = [], isLoading: loadingUser } = useListUserQuery();

  var userArray = [];

  if (!loadingUser) {
    userList.map((item) => {
      userArray.push(item.name);
    });
  }

  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [editTask] = useEditTaskMutation();

  var board;

  if (!loadingTask) {
    const groupBy = (array, key) => {
      return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      }, {});
    };

    const filteredList = rawList.map(
      ({ name: title, _id: id, description: description, assignedTo }) => ({
        title,
        id,
        description,
        assignedTo,
      })
    );

    const filteredResult = groupBy(filteredList, "assignedTo");
    // const user = ["Ram", "John", "Joseph", "Tchaikovsky"];
    var emptyArr = [];

    userArray.map((value, key) => {
      if (filteredResult[value]) {
        emptyArr.push({
          id: key + 1,
          title: value,
          cards: filteredResult[value],
        });
      } else {
        emptyArr.push({
          id: key + 1,
          title: value,
          cards: [],
        });
      }
    });
    board = {
      lanes: emptyArr,
    };
  }

  const [taskId, setTaskId] = React.useState();
  const [drawer, setDrawer] = React.useState(false);

  const list = (id) => (
    <Box
      sx={{
        width: "auto",
        height: 400,
      }}
      role="presentation"
    >
      <TaskForm taskId={id}></TaskForm>
    </Box>
  );
  return (
    <>
      {loadingUser ? (
        "Loading... "
      ) : (
        <>
          <Board
            data={board}
            style={{
              border: "1px solid #e6e6e6",
              borderRadius: "10px",
              backgroundColor: "white",
              overflowX: "auto",
              height: "85vh",
              boxShadow: "4px 5px 10px rgb(0 0 0 / 3%)",
              width: "1200px",
              marginLeft: "-60px",
              marginTop: "-55px",
            }}
            cardStyle={{
              backgroundColor: "#ededed",
              boxShadow: "2px 1px 4px #888888",
              border: "1px solid #e8e6eb",
              width: "1900px",
            }}
            laneStyle={{
              backgroundColor: "white",
            }}
            onCardClick={(id) => {
              setTaskId(id);
              setDrawer(true);
            }}
            handleDragEnd={(
              cardId,
              sourceLaneId,
              targetLaneId,
              position,
              cardDetails,
              e
            ) => {
              console.log(board.lanes, "board Lanes");

              const laneArr = board.lanes;
              var userArr = [];

              laneArr.map((item) => {
                userArr.push(item.title);
              });
              console.log(userArr, "userArr");

              var assignedCol = targetLaneId - 1;
              var newAssigned = userArray[assignedCol];
              console.log(userArray[assignedCol], "user target");
              console.log(cardDetails.id);

              const updatedTask = {
                id: cardDetails.id,
                body: {
                  assignedTo: newAssigned,
                },
              };
              editTask(updatedTask);
            }}
          />
          <Box>
            <React.Fragment key={"bottom"}>
              <CustomeDrawer
                anchor="bottom"
                open={drawer}
                onClose={() => {
                  setDrawer(false);
                }}
              >
                {list(taskId)}
              </CustomeDrawer>
            </React.Fragment>
          </Box>
        </>
      )}
    </>
  );
};
