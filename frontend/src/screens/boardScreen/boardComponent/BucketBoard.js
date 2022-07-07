import React from "react";
import {
  useEditTaskMutation,
  useListDepartmentTaskQuery,
} from "../../../state/taskSlice";
import Board from "react-trello";
import { TaskForm } from "../../taskScreen/taskComponent/TaskForm";
import { useListBucketQuery } from "../../../state/bucketSlice";
import Box from "@mui/material/Box";
import { Dialog } from "@mui/material";

export const BucketBoard = (data) => {
  const [editTask] = useEditTaskMutation();
  const [editOpen, setEditOpen] = React.useState(false);
  const [taskId, setTaskId] = React.useState();

  const handleEditClose = () => {
    setEditOpen(false);
  };

  var board;

  const { data: bucketList = [], isLoading: loadingBucket } =
    useListBucketQuery();

  const dept = "IT";

  const {
    data: rawList = [],
    isLoading: loadingTask,
    error: error,
  } = useListDepartmentTaskQuery(dept);

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
      ({
        name: title,
        _id: id,
        description: description,
        bucket,
        department,
      }) => ({
        title,
        id,
        description,
        department,
        bucket: bucket?.name,
        bucketId: bucket?._id,
      })
    );

    // var newFilteredList = filteredList.filter(
    //   (item) => !data.data.includes(item.bucket)
    // );

    const filteredResult = groupBy(filteredList, "bucket");

    var newBucketList = bucketList.filter(
      (item) => !data.data.includes(item.name)
    );

    var emptyArr = [];

    newBucketList.map((item) => {
      if (filteredResult[item.name]) {
        emptyArr.push({
          id: item._id,
          title: item.name,
          cards: filteredResult[item.name],
        });
      } else {
        emptyArr.push({
          id: item._id,
          title: item.name,
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
              const laneArr = board.lanes;
              var bucketArr = [];

              laneArr.map((item) => {
                bucketArr.push(item.title);
              });
              const updatedBucket = {
                id: cardDetails.id,
                body: {
                  bucket: targetLaneId,
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
