import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useListCommentQuery } from "../../../state/taskCommentSlice";

export const TaskComment = (detailTask) => {
  console.log(detailTask.task, "detail task");
  const {
    data: commentList = [],
    isLoading: loadingComment,
    error,
  } = useListCommentQuery(detailTask.data);

  return (
    <>
      {!detailTask.task.comment ? (
        " Loading..."
      ) : (
        <>
          <List
            sx={{
              width: "100%",
              maxWidth: "none",
              bgcolor: "background.paper",
            }}
          >
            {detailTask?.task?.comment.map((item) => {
              return (
                <>
                  <ListItem key={item._id} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.userId}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Comment :
                          </Typography>
                          {item.comment}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              );
            })}
          </List>
        </>
      )}
    </>
  );
};
