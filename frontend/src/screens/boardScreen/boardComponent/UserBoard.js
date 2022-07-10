import React from "react";
import {
  useEditTaskMutation,
  useListDepartmentTaskQuery,
  useListTaskQuery,
} from "../../../state/taskSlice";
import Board from "react-trello";
import { useListUserQuery } from "../../../state/userSlice";
import { Dialog } from "@mui/material";
import { TaskForm } from "../../taskScreen/taskComponent/TaskForm";

export const UserBoard = (data) => {
  const taskType = sessionStorage.getItem("taskType");

  const { data: allList = [], isLoading: loadingAllTask } = useListTaskQuery();

  var userArray = [];
  const dept = "IT";

  const { data: deptTask = [], isLoading: loadingDeptTask } =
    useListDepartmentTaskQuery(dept);

  const { data: userList = [], isLoading: loadingUser } = useListUserQuery();

  var rawList = [];

  if (taskType == "unassigned") {
    allList.map((item) => {
      if (!item.bucket) {
        console.log(item, "if");
        rawList.push(item);
      }
    });
  } else if (taskType == "bucket") {
    allList.map((item) => {
      if (item.bucket) {
        console.log(item, "if");
        rawList.push(item);
      }
    });
  }

  if (!loadingUser) {
    userList.map((item) => {
      if (item.department == "IT") {
        userArray.push(item.name);
      }
    });
  }

  var newArr = userArray.filter((item) => !data.data.includes(item));

  const [editTask] = useEditTaskMutation();
  const [editOpen, setEditOpen] = React.useState(false);

  const handleEditClose = () => {
    setEditOpen(false);
  };

  var board;

  if (!loadingAllTask && !loadingDeptTask) {
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
    var emptyArr = [];

    newArr.map((value, key) => {
      // var color = Math.floor(Math.random() * 16777215).toString(16);
      // console.log(color);
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

  return (
    <>
      {loadingUser && loadingAllTask && loadingDeptTask ? (
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
          <Dialog open={editOpen} onClose={handleEditClose}>
            <TaskForm taskId={taskId}></TaskForm>
          </Dialog>
        </>
      )}
    </>
  );
};
