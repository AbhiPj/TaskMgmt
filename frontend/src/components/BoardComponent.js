import React from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  Divider,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import Accordion from "@mui/material/Accordion";
import TextField from "@mui/material/TextField";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector, useDispatch } from "react-redux";
import { taskState, useEditTaskMutation } from "../state/taskSlice";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useListUserQuery } from "../state/userSlice";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export const CustomCard = (props) => {
  const {
    showDeleteButton,
    style,
    tagStyle,
    onClick,
    onDelete,
    assignedTo,
    onChange,
    className,
    id,
    title,
    comment,
    progress,
    priority,
    label,
    description,
    tags,
    cardDraggable,
    editable,
    dueDate,
    commentLength,
    t,
  } = props;

  const [editTask] = useEditTaskMutation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dueDateState, setDuDateState] = React.useState(new Date(dueDate));

  const handleDueDateChange = (newValue) => {
    setDuDateState(newValue);
    const updatedTask = {
      id: id,
      body: {
        dueDate: newValue,
      },
    };
    editTask(updatedTask);
  };

  const open = Boolean(anchorEl);
  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(null);
    const { userId, taskId } = event.currentTarget.dataset;
    const updatedTask = {
      id: taskId,
      body: {
        assignedTo: userId,
      },
    };
    editTask(updatedTask);
  };
  var color = "";

  const showComplete = useSelector((state) => state.taskState.showComplete);
  const renderProgressBar = (data) => {
    var value = 0;
    if (data == "Ongoing") {
      value = 50;
      color = "#dbdb65";
    } else if (data == "Completed") {
      value = 100;
      color = "#60d184";
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
      backgroundColor: theme.palette.mode === "light" ? color : "#308fe8",
    },
  }));

  const { data: userList = [], isLoading: loadingUser } = useListUserQuery();
  const renderMenuItem = () => {
    return userList.map((item) => (
      <MenuItem data-user-id={item._id} data-task-id={id} onClick={handleMenuClick}>
        {item.name}
      </MenuItem>
    ));
  };
  const hideInput = true;
  return (
    <Box sx={{ width: 235, paddingX: 1 }}>
      {/* {progress != "Completed" && ( */}
      <>
        <Card
          sx={{
            height: "auto",
            minHeight: 150,
            mb: 1,
            borderRadius: 2,
          }}
          elevation={4}
          data-id={id}
        >
          <CardContent sx={{ whiteSpace: "pre-wrap" }} onClick={onClick}>
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
              {/* <Box sx={{ width: 20, flexShrink: 0, marginLeft: 2 }}>
                  <img src={`https://avatars.dicebear.com/api/identicon/:${id}.svg`}></img>
                </Box> */}
            </Box>
            {renderProgressBar(progress)}
            <Typography
              sx={{
                fontSize: 12,
                marginTop: 2,
                color: "#878787",
              }}
            >
              Status: {progress ? progress : "None"}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                marginTop: 0.1,
                color: "#878787",
              }}
            >
              {priority ? <>Priority : {priority}</> : <></>}
            </Typography>
            {/* </Box> */}
          </CardContent>
          <Divider sx={{ mt: 0.4 }}></Divider>
          <Box
            color={"#717073"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ paddingY: 0.3, minHeight: 44 }}
          >
            <div>
              {dueDate && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "flex-start",
                    gap: 1.2,
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      // label="Start Date"
                      size="small"
                      // inputFormat="MM/dd/yyyy"
                      value={dueDateState}
                      onChange={handleDueDateChange}
                      renderInput={
                        hideInput
                          ? ({ inputRef, inputProps, InputProps }) => (
                              <Box ref={inputRef}>{InputProps?.endAdornment}</Box>
                            )
                          : (params) => <TextField {...params} />
                      }
                    />
                  </LocalizationProvider>
                  <Typography fontSize={11}>Due </Typography>
                </Box>
              )}
            </div>
            {assignedTo && (
              <Box sx={{}}>
                <IconButton
                  sx={{ marginRight: 2 }}
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleIconClick}
                >
                  <PersonAddIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {renderMenuItem()}
        </Menu>
      </>
      {/* )} */}

      {showComplete && progress === "Completed" ? (
        <>
          <Accordion sx={{}}>
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
    </Box>
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
      <Accordion sx={{}}>
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
