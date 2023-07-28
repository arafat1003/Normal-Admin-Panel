import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ProfileStatus } from "../../configuration/authconfiguration";
import { SET_NAME, SET_USER } from "../../redux/features/authSlicer";
import { Grid, Typography } from "@mui/material";

const ProfileDetails = () => {
  const [profile, setProfile] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUser() {
      const data = await ProfileStatus();
      console.log(data);

      setProfile(data);
      dispatch(SET_USER(data));
      dispatch(SET_NAME(data.name));
    }
    getUser();
  }, [dispatch]);

  return (
    <>
      <Grid container direction="row">
        <Grid item lg={6}>
          <img
            style={{
              maxWidth: "500px",
            }}
            src={profile.photo}
            alt=""
          />
        </Grid>
        <Grid item>
          <Typography variant="h2">{profile.name}</Typography>
          <Typography variant="h3">{profile.email}</Typography>
          <Typography variant="h4">{profile.phoneNumber}</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileDetails;
