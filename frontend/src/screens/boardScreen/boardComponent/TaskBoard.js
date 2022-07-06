import React from "react";
import {
  useEditTaskMutation,
  useListDepartmentTaskQuery,
} from "../../../state/taskSlice";
import Board from "react-trello";
import { TaskForm } from "../../taskScreen/taskComponent/TaskForm";
import Box from "@mui/material/Box";
import { Dialog } from "@mui/material";

export const TaskBoard = () => {
  //   const {
  //     data: rawList = [],
  //     isLoading: loadingTask,
  //     error: error,
  //   } = useListTaskQuery();

  const dept = "IT";

  const {
    data: rawList = [],
    isLoading: loadingTask,
    error: error,
  } = useListDepartmentTaskQuery(dept);

  const [editTask] = useEditTaskMutation();
  const [editOpen, setEditOpen] = React.useState(false);
  const [taskId, setTaskId] = React.useState();

  const handleEditClose = () => {
    setEditOpen(false);
  };

  var board;

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

    const filteredList = rawList.map(
      ({ name: title, _id: id, description: description, priority }) => ({
        title,
        id,
        description,
        priority,
      })
    );

    const filteredResult = groupBy(filteredList, "priority");

    const priority = ["Low", "Medium", "High"]; //replace this with dynamic priority list later
    var emptyArr = [];

    priority.map((value, key) => {
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

  return (
    <Box>
      {loadingTask ? (
        "Loading... "
      ) : (
        <>
          <Board
            data={board}
            style={{
              boxShadow: "4px 5px 10px rgb(0 0 0 / 3%)",
              border: "2px solid #e6e6e6",
              borderRadius: "10px",
              backgroundColor: "white",
              overflowX: "auto",
              height: "85vh",
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
              setEditOpen(true);
            }}
            handleDragEnd={(
              cardId,
              sourceLaneId,
              targetLaneId,
              position,
              cardDetails,
              e
            ) => {
              const priority = ["Low", "Medium", "High"];
              var priorityColumn = targetLaneId - 1;
              var newPriority = priority[priorityColumn];
              const updatedTask = {
                id: cardDetails.id,
                body: {
                  priority: newPriority,
                },
              };
              editTask(updatedTask);
            }}
          />
          <Dialog open={editOpen} onClose={handleEditClose}>
            <TaskForm taskId={taskId}></TaskForm>
          </Dialog>
        </>
      )}
    </Box>
  );
};
