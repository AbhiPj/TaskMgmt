import React from "react";
import {
  useEditTaskMutation,
  useListDepartmentTaskQuery,
  useListTaskQuery,
} from "../../../state/taskSlice";
import Board from "react-trello";
import { TaskForm } from "../../taskScreen/taskComponent/TaskForm";
import Box from "@mui/material/Box";
import { Dialog } from "@mui/material";

export const TaskBoard = (data) => {
  const taskType = sessionStorage.getItem("taskType");
  console.log(taskType);

  const { data: allList = [], isLoading: loadingAllTask } = useListTaskQuery();

  const dept = "IT";

  const { data: deptTask = [], isLoading: loadingTask } =
    useListDepartmentTaskQuery(dept);

  // var [rawList, setRawList] = [];
  var rawList = [];

  if (taskType == "individual") {
    // setRawList(allList);
    allList.map((item) => {
      rawList.push(item);
    });
  } else if (taskType == "bucket") {
    deptTask.map((item) => {
      rawList.push(item);
    });
  }

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
    console.log(filteredResult, "filtered result");

    const priority = ["Low", "Medium", "High"]; //replace this with dynamic priority list later
    var emptyArr = [];

    var newArr = priority.filter((item) => !data.data.includes(item));

    newArr.map((value, key) => {
      if (filteredResult[value]) {
        if (value == "Low") {
          emptyArr.push({
            id: key + 1,
            title: value,
            cards: filteredResult[value],
            cardStyle: { backgroundColor: "#f8e8fa" },
          });
        } else if (value == "Medium") {
          emptyArr.push({
            id: key + 1,
            title: value,
            cards: filteredResult[value],
            cardStyle: { backgroundColor: "#faf6e8" },
          });
        } else if (value == "High") {
          emptyArr.push({
            id: key + 1,
            title: value,
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
