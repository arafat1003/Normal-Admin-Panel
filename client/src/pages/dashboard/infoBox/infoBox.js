import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const InfoBox = ({ icon, name, price, Bgcolor, Bg }) => {
  return (
    <>
      <Box
        color={Bg}
        sx={{
          transition: "transform 0.3s", // Apply transition on the 'transform' property with a duration of 0.3 seconds
          "&:hover": {
            transform: "translateY(-20px)", // Apply a translation of -20px on the Y-axis when hovering
          },
        }}
      >
        <Grid
          padding="5px 10px"
          borderRadius="10px"
          sx={{
            backgroundColor: Bgcolor,
            "& 	.MuiTypography-root": {
              color: "white",
            },
          }}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item lg={3}>
            {icon}
          </Grid>
          <Grid item lg={9}>
            <Grid container direction="column">
              <Grid item>
                <Typography fontSize="20px" variant="h4">
                  {name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h3">{price}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default InfoBox;
