import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAddCaseMutation } from "../../../state/caseSlice";
import { useListChecklistQuery } from "../../../state/checklistSlice";
import { useGenerateChecklistTaskMutation } from "../../../state/taskSlice";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

export const GenerateChecklist = () => {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const { vertical, horizontal, open } = state;

  const { data: rawList = [], isLoading: checklistLoading } =
    useListChecklistQuery();

  console.log(rawList, "rwawkt");
  const [addCase] = useAddCaseMutation();
  const [generateTask] = useGenerateChecklistTaskMutation();

  const [name, setName] = useState("");
  const [checklist, setChecklist] = useState();

  const handleSubmit = () => {
    generateTask(checklist);
    setState({ open: true });
  };

  return (
    <>
      <>
        <Box sx={{ padding: 5, width: 500 }}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12}>
              <TextField
                variant="filled"
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 13 } }}
                fullWidth
                label="Name"
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid> */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Checklist</InputLabel>
                <Select
                  sx={{
                    // height: 40,
                    fontSize: 14,
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  variant="filled"
                  value={checklist}
                  size="small"
                  label="checklist"
                  onChange={(e) => setChecklist(e.target.value)}
                >
                  {rawList.map((item) => {
                    return <MenuItem value={item._id}>{item.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box display={"flex"} flexDirection="row-reverse" mt={3}>
            <Button onClick={handleSubmit} variant="outlined">
              Submit
            </Button>
          </Box>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={open}
            onClose={handleClose}
            // message="Task Generated"
            key={vertical + horizontal}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Task Generated!
            </Alert>
          </Snackbar>
        </Box>
      </>
    </>
  );
};
