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
import { CustomCard, LaneHeader } from "../../../components/BoardComponent";

export const UserBoard = (data) => {
  const taskType = sessionStorage.getItem("taskType");

  const { data: allList = [], isLoading: loadingAllTask } = useListTaskQuery();

  var userArray = [];

  const { data: userList = [], isLoading: loadingUser } = useListUserQuery();

  if (!loadingUser) {
    console.log(userList, "userlist");
  }
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

  // if (!loadingUser) {
  //   userList.map((item) => {
  //     // if (item.department == "IT") {
  //     userArray.push(item.name);
  //     // }
  //   });
  // }
  // userArray.push("None");
  console.log(userList, "userlist");

  var newArr = userList.filter((item) => !data.data.includes(item.name));

  const [editTask] = useEditTaskMutation();
  const [editOpen, setEditOpen] = React.useState(false);

  const handleEditClose = () => {
    setEditOpen(false);
  };

  var board;

  if (!loadingAllTask) {
    const groupBy = (array, key) => {
      return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
      }, {});
    };

    const filteredList = rawList.map(
      ({ name: title, _id: id, description: description, progress, assignedTo, comment }) => ({
        title,
        id,
        description,
        progress,
        assignedTo: assignedTo?.name,
        userId: assignedTo?._id,
        comment,
      })
    );
    // console.log(filteredList, "filteredList");

    const filteredResult = groupBy(filteredList, "assignedTo");

    console.log(filteredResult, "Filtered result");
    var emptyArr = [];

    newArr.map((item) => {
      if (filteredResult[item.name]) {
        emptyArr.push({
          id: item?._id,
          title: item?.name,
          // userId: userId,
          cards: filteredResult[item.name],
        });
      } else {
        emptyArr.push({
          id: item._id,
          title: item?.name,
          cards: [],
        });
      }
      // if (filteredResult["undefined"]) {
      //   emptyArr.push({
      //     id: item?._id,
      //     title: "None",
      //     // userId: userId,
      //     cards: filteredResult[item.name],
      //   });
      // }
    });

    console.log(emptyArr, "empt");
    board = {
      lanes: emptyArr,
    };
  }

  const [taskId, setTaskId] = React.useState();

  const components = {
    Card: CustomCard,
    LaneHeader: LaneHeader,
  };

  return (
    <>
      {loadingUser && loadingAllTask ? (
        "Loading... "
      ) : (
        <>
          <Board
            data={board}
            components={components}
            style={{
              backgroundColor: "#f2f3f5",
              overflowX: "auto",
              height: "100%",
              width: "1200px",
            }}
            cardStyle={{
              backgroundColor: "#ededed",
              boxShadow: "2px 1px 4px #888888",
              border: "1px solid #e8e6eb",
              width: "1900px",
            }}
            laneStyle={{
              backgroundColor: "#f2f3f5",
            }}
            onCardClick={(id) => {
              setTaskId(id);
              setEditOpen(true);
            }}
            handleDragEnd={(cardId, sourceLaneId, targetLaneId, position, cardDetails, e) => {
              const laneArr = board?.lanes;
              console.log(cardDetails, "cardetails");
              var userArr = [];

              laneArr.map((item) => {
                userArr.push(item.title);
              });
              // console.log(userArr, "userArr");
              // var assignedCol = targetLaneId - 1;
              // var newAssigned = userArray[assignedCol];
              // console.log(userArray[assignedCol], "user target");
              // console.log(cardDetails.id);

              const updatedTask = {
                id: cardDetails.id,
                body: {
                  assignedTo: targetLaneId,
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
