import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userall } from "../../redux/features/authSlicer";
import { Button, Grid, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { UpdateStatus } from "../../configuration/authconfiguration";

const EditProfile = () => {
  const user = useSelector(userall);

  const initialState = {
    name: user.name,
    email: user.email,
    phonenumber: user.phonenumber,
    photo: user.photo,
  };

  const [profile, setProfile] = useState(initialState);
  const [image, setImage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const imageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const saveProfile = async (event) => {
    event.preventDefault();

    try {
      let imageURL;
      if (
        image &&
        (image.type === "image/jpeg" ||
          image.type === "image/jpg" ||
          image.type === "image/png")
      ) {
        const newImage = new FormData();
        newImage.append("file", image);
        newImage.append("cloud_name", "delwsxotx");
        newImage.append("upload_preset", "xb5mnpr1");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/delwsxotx/image/upload",
          { method: "post", body: newImage } // Use 'newImage' instead of 'image' here
        );
        const imageData = await response.json();
        imageURL = imageData.url.toString();
        console.log(imageURL);
      }

      const formData = {
        name: profile.name,
        phonenumber: profile.phonenumber,
        photo: imageURL || profile.photo,
      };

      console.log(formData);
      toast.success("hurrah");
      const data = await UpdateStatus(formData);
      // Your logic to submit the formData to the server can go here
      // For example, you can dispatch an action using Redux or use fetch to submit the data to your server
    } catch (error) {
      console.log(error);
      toast.error("shit");
    }
  };

  return (
    <>
      <Grid container spacing={6} direction="column">
        <Grid item>
          <TextField
            fullWidth
            type="text"
            name="name"
            // eslint-disable-next-line no-restricted-globals
            label="name"
            value={profile.name}
            // Some code that uses the 'name' variable
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            disabled
            fullWidth
            type="text"
            name="email"
            // eslint-disable-next-line no-restricted-globals
            label="email"
            value={profile.email}
            // Some code that uses the 'name' variable
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            type="file"
            name="photo"
            // eslint-disable-next-line no-restricted-globals

            // Some code that uses the 'name' variable
            onChange={imageChange}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            type="number"
            name="phonenumber"
            // eslint-disable-next-line no-restricted-globals

            value={profile.phonenumber}
            // Some code that uses the 'name' variable
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <Button onClick={saveProfile}>Submit</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default EditProfile;
