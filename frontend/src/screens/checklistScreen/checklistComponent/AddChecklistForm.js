import React, { useState, useEffect } from "react";

import {
  Button,
  Grid,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { useAddChecklistMutation } from "../../../state/checklistSlice";

export const AddChecklistForm = () => {
  const [addChecklist] = useAddChecklistMutation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const checklistObj = {
      name: name,
      description: description,
    };
    addChecklist(checklistObj);
  };
  return (
    <>
      <Box sx={{ padding: 3, marginTop: 1 }}>
        <Box width={500} margin={"auto"}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{ marginTop: 1, marginBottom: 1 }}
              >
                Notes :
              </Typography>
              <TextareaAutosize
                style={{
                  width: "100%",
                  height: "100px",
                  fontFamily: "Helvetica",
                  backgroundColor: "rgba(230,230,230,0.6)",
                  border: "none",
                }}
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Stack
                display={"flex"}
                direction={"row-reverse"}
                spacing={2}
                mt={2}
                mb={3}
                padding={2}
              >
                <Button variant="outlined" onClick={handleSubmit}>
                  Submit
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* )} */}
    </>
  );
};
