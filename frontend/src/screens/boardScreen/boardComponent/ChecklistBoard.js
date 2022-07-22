import React from "react";
import {
  useEditTaskMutation,
  useListDepartmentTaskQuery,
  useListTaskQuery,
} from "../../../state/taskSlice";
import Board from "react-trello";
import { TaskForm } from "../../taskScreen/taskComponent/TaskForm";
import { useListBucketQuery } from "../../../state/bucketSlice";
import Box from "@mui/material/Box";
import { Dialog } from "@mui/material";
import { CustomCard, LaneHeader } from "../../../components/BoardComponent";
import { useListChecklistQuery } from "../../../state/checklistSlice";

export const ChecklistBoard = (data) => {
  console.log(data, "data");
  const taskType = sessionStorage.getItem("taskType");
  const { data: allList = [], isLoading: loadingAllTask } = useListTaskQuery();
  const [editTask] = useEditTaskMutation();
  const [editOpen, setEditOpen] = React.useState(false);
  const [taskId, setTaskId] = React.useState();

  const handleEditClose = () => {
    setEditOpen(false);
  };

  var board;

  const { data: checkList = [], isLoading: loadingBucket } = useListChecklistQuery();

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
  var taskFilter = [];
  taskFilter = rawList.filter((item) => !data.data.includes(item.progress));

  if (!loadingAllTask) {
    const groupBy = (array, key) => {
      // Return the end result

      return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
      }, {}); // empty object is the initial value for result object
    };

    const filteredList = taskFilter.map(
      ({
        name: title,
        _id: id,
        description: description,
        department,
        priority,
        assignedTo,
        dueDate,
        progress,
        sourceInfo,
        comment,
      }) => ({
        title,
        id,
        dueDate,
        priority,
        assignedTo,
        description,
        progress,
        department,
        comment,

        checklist: sourceInfo?.name,
        checklistId: sourceInfo?._id,
      })
    );

    console.log(filteredList, "Filtered list");

    const filteredResult = groupBy(filteredList, "checklist");

    // console.log(filteredResult, "filteredResult");

    var newChecklist = checkList.filter((item) => !data.data.includes(item.name));

    var emptyArr = [];

    newChecklist.map((item) => {
      if (filteredResult[item.name]) {
        emptyArr.push({
          id: item._id,
          title: item?.name,
          cards: filteredResult[item.name],
        });
      } else {
        emptyArr.push({
          id: item._id,
          title: item?.name,
          cards: [],
        });
      }
    });

    board = {
      lanes: emptyArr,
    };

    // console.log(emptyArr, "empteyas");
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
            }}
            cardStyle={
              {
                // backgroundColor: "#ededed",
                // boxShadow: "2px 1px 4px #888888",
                // border: "1px solid #e8e6eb",
                // width: "1900px",
              }
            }
            laneStyle={{
              width: 240,
              height: "100%",
              backgroundColor: "#f2f3f5",
            }}
            onCardClick={(id) => {
              setTaskId(id);
              setEditOpen(true);
            }}
            handleDragEnd={(cardId, sourceLaneId, targetLaneId, position, cardDetails, e) => {
              const laneArr = board.lanes;
              var bucketArr = [];

              laneArr.map((item) => {
                bucketArr.push(item.title);
              });
              const updatedBucket = {
                id: cardDetails.id,
                body: {
                  sourceInfo: targetLaneId,
                },
              };
              editTask(updatedBucket);
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
