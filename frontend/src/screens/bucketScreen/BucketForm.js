import React, { useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Stack,
  ButtonGroup,
} from "@mui/material";

import { useAddBucketMutation } from "../../state/bucketSlice";

export const BucketForm = () => {
  const [addBucket] = useAddBucketMutation();
  const handleSubmit = () => {
    const addBucketObj = {
      name: bucket,
    };
    addBucket(addBucketObj);
  };

  const [bucket, setBucket] = useState("");
  return (
    <Box sx={{ padding: 3, marginTop: 1 }}>
      <Typography variant="h5" mb={3}>
        Add Bucket
      </Typography>
      <Box width={500} margin={"auto"}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              variant="filled"
              inputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 13 } }}
              fullWidth
              label="Bucket name"
              size="small"
              value={bucket}
              onChange={(e) => setBucket(e.target.value)}
            />
          </Grid>
          <Stack
            display={"flex"}
            direction={"row-reverse"}
            spacing={2}
            mt={2}
            mb={3}
            padding={2}
          >
            <Button onClick={handleSubmit}>Submit</Button>
          </Stack>
        </Grid>
      </Box>
    </Box>
  );
};
