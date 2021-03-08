import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ImageUpload from "./ImageUpload";

export default function AfterForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        After Image
      </Typography>

      <Grid spacing={3} container justify="center" alignItems="center">
        <ImageUpload />
      </Grid>
    </React.Fragment>
  );
}
