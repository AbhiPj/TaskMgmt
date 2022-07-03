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
  console.log(detailTask.data, "detail task comment");

  const {
    data: commentList = [],
    isLoading: loadingComment,
    error,
  } = useListCommentQuery(detailTask.data);

  if (!loadingComment) {
    console.log(commentList, "commentList");
  }

  return (
    <>
      {loadingComment ? (
        " Loading..."
      ) : (
        <>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {commentList.map((item) => {
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
                      primary={item.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Comment :{" "}
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
