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

  if (!loadingAllTask) {
    const groupBy = (array, key) => {
      return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      }, {});
    };

    const filteredList = rawList.map(
      ({
        name: title,
        _id: id,
        description: description,
        assignedTo,
        comment,
      }) => ({
        title,
        id,
        description,
        assignedTo: assignedTo?.name,
        comment,
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
              // boxShadow: "4px 5px 10px rgb(0 0 0 / 3%)",
              // border: "2px solid #e6e6e6",
              // borderRadius: "10px",
              backgroundColor: "#f2f3f5",
              overflowX: "auto",
              height: "85vh",
              width: "1200px",
              marginLeft: "-80px",
              marginTop: "-65px",
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
