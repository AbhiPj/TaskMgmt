import React from "react";
import { CustomCard, LaneHeader } from "../../../components/BoardComponent";
import { useEditTaskMutation, useListTaskQuery } from "../../../state/taskSlice";
import Board from "react-trello";
import { TaskForm } from "../../taskScreen/taskComponent/TaskForm";
import Box from "@mui/material/Box";
import { Dialog } from "@mui/material";

export const TaskBoard = (data) => {
  const taskType = sessionStorage.getItem("taskType");
  const { data: allList = [], isLoading: loadingAllTask } = useListTaskQuery();

  var rawList = [];
  if (taskType === "unassigned") {
    allList.map((item) => {
      if (item.sourceModel === "Unassigned") {
        rawList.push(item);
      }
    });
  } else if (taskType === "bucket") {
    allList.map((item) => {
      if (item.sourceModel === "Bucket") {
        rawList.push(item);
      }
    });
  } else if (taskType === "checklist") {
    allList.map((item) => {
      if (item.sourceModel === "Checklist") {
        rawList.push(item);
      }
    });
  }

  const [editTask] = useEditTaskMutation();
  const [editOpen, setEditOpen] = React.useState(false);
  const [taskId, setTaskId] = React.useState();

  const handleEditClose = () => {
    setEditOpen(false);
  };

  var board;

  if (!loadingAllTask) {
    const groupBy = (array, key) => {
      // Return the end result
      return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
      }, {}); // empty object is the initial value for result object
    };

    const filteredList = rawList.map(
      ({ name: title, _id: id, description, priority, comment, progress }) => ({
        title,
        id,
        description,
        priority,
        progress,
        comment,
      })
    );

    const filteredResult = groupBy(filteredList, "priority");
    console.log(filteredResult, "filtered result");

    const priority = ["Low", "Medium", "High", "None"];
    var emptyArr = [];

    var newArr = priority.filter((item) => !data.data.includes(item));

    newArr.map((value, key) => {
      if (filteredResult[value]) {
        if (value === "Low") {
          emptyArr.push({
            id: key + 1,
            title: value,
            cards: filteredResult[value],
            cardStyle: { backgroundColor: "white" },
          });
        } else if (value === "Medium") {
          emptyArr.push({
            id: key + 1,
            title: value,
            cards: filteredResult[value],
            cardStyle: { backgroundColor: "white" },
          });
        } else if (value === "High") {
          emptyArr.push({
            id: key + 1,
            title: value,
            cards: filteredResult[value],
            cardStyle: { backgroundColor: "white" },
          });
        } else if (value === "None") {
          emptyArr.push({
            id: key + 1,
            title: "None",
            cards: filteredResult[value],
            cardStyle: { backgroundColor: "#e8faed" },
          });
        }
      } else {
        emptyArr.push({
          id: key + 1,
          title: value,
          cards: [],
        });
      }
    });

    console.log(emptyArr);

    board = {
      lanes: emptyArr,
    };
  }

  const components = {
    Card: CustomCard,
    LaneHeader: LaneHeader,
  };

  return (
    <Box>
      {loadingAllTask ? (
        "Loading... "
      ) : (
        <>
          <Board
            components={components}
            data={board}
            style={{
              backgroundColor: "#f2f3f5",
              overflowX: "auto",
              height: "100%",
              width: "1200px",
              marginLeft: "-80px",
              marginTop: "-65px",
            }}
            cardStyle={{}}
            laneStyle={{
              height: "100%",
              backgroundColor: "#f2f3f5",
            }}
            onCardClick={(id) => {
              setTaskId(id);
              setEditOpen(true);
            }}
            handleDragEnd={(cardId, sourceLaneId, targetLaneId, position, cardDetails, e) => {
              const priority = ["Low", "Medium", "High", "None"];
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
