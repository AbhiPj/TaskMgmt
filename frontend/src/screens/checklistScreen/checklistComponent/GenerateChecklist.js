import {
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
export const GenerateChecklist = (rawList) => {
  console.log(rawList, "rwawkt");
  const [addCase] = useAddCaseMutation();

  const [name, setName] = useState("");
  const [checklist, setChecklist] = useState();

  const handleSubmit = () => {
    const caseObj = {
      name: name,
      checklist: checklist,
    };
    addCase(caseObj);
    console.log(caseObj, "caseObj submit");
  };

  return (
    <>
      <>
        <Box sx={{ padding: 5, width: 500 }}>
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
                  {rawList.data.map((item) => {
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
        </Box>
      </>
    </>
  );
};
