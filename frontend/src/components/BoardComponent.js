import Box from "@mui/material/Box";
import { Button, Card, CardContent, Dialog, Divider, styled, Typography } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector, useDispatch } from "react-redux";
import { taskState } from "../state/taskSlice";

export const CustomCard = (props) => {
  const showComplete = useSelector((state) => state.taskState.showComplete);
  console.log(showComplete, "Show complete ");

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
    progress,
    label,
    description,
    tags,
    cardDraggable,
    editable,
    commentLength,
    t,
  } = props;

  const renderProgressBar = (data) => {
    var value = 0;
    var color = "";
    if (data == "Ongoing") {
      value = 50;
      color = "#4281db";
    } else if (data == "Completed") {
      value = 100;
      color = "#4281db";
    }
    return (
      <>
        <BorderLinearProgress variant="determinate" value={value} />
      </>
    );
  };
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 5,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#4281db" : "#308fe8",
    },
  }));

  return (
    <>
      {progress != "Completed" ? (
        <>
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
          >
            <CardContent sx={{ whiteSpace: "pre-wrap" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: 1,
                }}
              >
                <Typography sx={{ fontSize: 13.3 }} color="text.primary" gutterBottom>
                  {title}
                </Typography>
                <Box sx={{ width: 20, flexShrink: 0, marginLeft: 2 }}>
                  <img src={`https://avatars.dicebear.com/api/identicon/:${id}.svg`}></img>
                </Box>
              </Box>
              {renderProgressBar(progress)}

              {/* <Typography
          sx={{
            fontSize: 12,
            marginTop: 2,
            color: "#878787",
            fontStyle: "italic",
          }}
        >
          {description}
        </Typography> */}
              <Typography
                sx={{
                  fontSize: 12,
                  marginTop: 2,
                  color: "#878787",
                  // fontStyle: "italic",
                }}
              >
                Status: {progress ? progress : "None"}
              </Typography>
              {/* </Box> */}
            </CardContent>
            <Divider sx={{ mt: 3 }}></Divider>
            <Box color={"#717073"} display={"flex"} alignItems={"center"} sx={{ padding: 1.4 }}>
              <CommentIcon color="inherit" fontSize="small" />
              <Typography ml={1.3} fontSize={12}>
                {comment?.length}
              </Typography>
            </Box>

            {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
          </Card>
        </>
      ) : (
        <> </>
      )}

      {showComplete && progress === "Completed" ? (
        <>
          <Accordion sx={{ width: 250 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </>
      ) : (
        <></>
      )}
    </>
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
    cards,
  } = props;

  // console.log(props, "props");

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box padding={1.2} sx={{ display: "flex", gap: 1.8 }}>
        <Typography sx={{ fontSize: 14 }}>{title}</Typography>
        <Typography sx={{ fontSize: 13, color: "#7e8185" }}>{cards?.length}</Typography>
      </Box>
      {/* <Div></Div ider> */}
      {/* <Box sx={{ marginTop: 1, marginBottom: 2 }}>
          <Button fullWidth variant="outlined">
            Add Task
          </Button>
        </Box> */}
    </Box>
  );
};

export const LaneFooter = (props) => {
  console.log(props, "foter");
  // const dispatch = useDispatch();

  return (
    // <Box
    //   sx={{
    //     marginTop: 2,
    //     display: "flex",
    //     justifyContent: "space-between",
    //     alignItems: "center",
    //     marginTop: 3.4,
    //   }}
    // >
    //   <Button onClick={() => dispatch(taskState(true))} sx={{ fontSize: 13, color: "gray" }}>
    //     Completed Task
    //   </Button>
    //   <ArrowDropDownIcon />
    // </Box>
    <>
      <Accordion sx={{ width: 250 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, c
            {/* onsectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget. */}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
