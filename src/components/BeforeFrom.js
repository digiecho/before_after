import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ImageUpload from "./ImageUpload";

export default function BeforeForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Before Image
      </Typography>

      <Grid container spacing={3} justify="center" alignItems="center">
        <ImageUpload />
      </Grid>
    </React.Fragment>
  );
}
