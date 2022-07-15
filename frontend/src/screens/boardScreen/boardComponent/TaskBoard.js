import React from "react";
import {
  useEditTaskMutation,
  useListDepartmentTaskQuery,
  useListTaskQuery,
} from "../../../state/taskSlice";
import Board from "react-trello";
import { TaskForm } from "../../taskScreen/taskComponent/TaskForm";
import Box from "@mui/material/Box";
import { Card, CardContent, Dialog, Divider, Typography } from "@mui/material";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import CommentIcon from "@mui/icons-material/Comment";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
export const TaskBoard = (data) => {
  const taskType = sessionStorage.getItem("taskType");
  // console.log(taskType);

  const { data: allList = [], isLoading: loadingAllTask } = useListTaskQuery();

  // const dept = "IT";

  // const { data: deptTask = [], isLoading: loadingTask } =
  //   useListDepartmentTaskQuery(dept);

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
    // console.log(filteredResult, "filtered result");

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
            cardStyle: { backgroundColor: "white" },
          });
        } else if (value == "Medium") {
          emptyArr.push({
            id: key + 1,
            title: value,
            cards: filteredResult[value],
            cardStyle: { backgroundColor: "white" },
          });
        } else if (value == "High") {
          emptyArr.push({
            id: key + 1,
            title: value,
            cards: filteredResult[value],
            cardStyle: { backgroundColor: "white" },
          });
        }
        // else {
        //   emptyArr.push({
        //     id: key + 1,
        //     title: "None",
        //     cards: filteredResult[value],
        //     cardStyle: { backgroundColor: "#e8faed" },
        //   });
        // }
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

  const components = {
    Card: card,
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
              // boxShadow: "4px 5px 10px rgb(0 0 0 / 3%)",
              // border: "2px solid #e6e6e6",
              // borderRadius: "10px",
              backgroundColor: "#f2f3f5",
              overflowX: "auto",
              height: "85vh",
              width: "1200px",
              marginLeft: "-60px",
              marginTop: "-55px",
            }}
            cardStyle={{
              backgroundColor: "#ededed",
              boxShadow: "4px 5px 10px rgb(0 0 0 / 3%)",
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

export const card = (props) => {
  const {
    showDeleteButton,
    style,
    tagStyle,
    onClick,
    onDelete,
    onChange,
    className,
    id,
    title,
    label,
    description,
    tags,
    cardDraggable,
    editable,
    t,
  } = props;

  // console.log(props, "pros");
  return (
    <Card
      sx={{ width: 240, height: "auto", minHeight: 140, mb: 1 }}
      data-id={id}
      onClick={onClick}
      style={style}
      // className={className}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {/* {title} */}
        </Typography>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography> */}
        <Typography variant="caption" sx={{ mt: 4 }}>
          {description}
        </Typography>
      </CardContent>
      <Divider sx={{ mt: 3 }}></Divider>
      <Box display={"flex"} alignItems={"center"} sx={{ padding: 1.4 }}>
        {/* <ModeCommentIcon /> */}
        <CommentIcon fontSize="small" />
        <Typography ml={1.3} fontSize={12}>
          33
        </Typography>
        {/* <ChatBubbleOutlineIcon fontSize="small"></ChatBubbleOutlineIcon> */}
      </Box>

      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};
