import Box from "@mui/material/Box";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  Divider,
  Typography,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";

export const CustomCard = (props) => {
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
    comment,
    label,
    description,
    tags,
    cardDraggable,
    editable,
    commentLength,
    t,
  } = props;

  return (
    <Card
      sx={{
        maxWidth: 250,
        height: "auto",
        minHeight: 150,
        mb: 1,
        borderRadius: 0.5,
      }}
      elevation={4}
      data-id={id}
      onClick={onClick}
      // style={style}
      // className={className}
    >
      <CardContent sx={{ whiteSpace: "pre-wrap" }}>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            marginTop: 2,
            color: "#878787",
            fontStyle: "italic",
          }}
        >
          {description}
        </Typography>
        {/* </Box> */}
      </CardContent>
      <Divider sx={{ mt: 3 }}></Divider>
      <Box
        color={"#717073"}
        display={"flex"}
        alignItems={"center"}
        sx={{ padding: 1.4 }}
      >
        {/* <ModeCommentIcon /> */}
        <CommentIcon color="inherit" fontSize="small" />
        {/* <CommentOutlinedIcon sx={{ color: "grey" }} fontSize="small" /> */}

        <Typography ml={1.3} fontSize={12}>
          {comment?.length}
        </Typography>
        {/* <ChatBubbleOutlineIcon fontSize="small"></ChatBubbleOutlineIcon> */}
      </Box>

      {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
    </Card>
  );
};

export const LaneHeader = (props) => {
  const {
    updateTitle,
    canAddLanes,
    onDelete,
    onDoubleClick,
    editLaneTitle,
    label,
    title,
    titleStyle,
    labelStyle,
    t,
    laneDraggable,
  } = props;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box padding={1.2}>
        <Typography sx={{ fontSize: 17 }}>{title}</Typography>
      </Box>
      {/* <Box sx={{ marginTop: 1, marginBottom: 2 }}>
          <Button fullWidth variant="outlined">
            Add Task
          </Button>
        </Box> */}
    </Box>
  );
};
