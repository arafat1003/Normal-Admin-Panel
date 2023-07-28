import {
  Grid,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import facebook from "../image/assets/facebook.png";
import google from "../image/assets/google-plus.png";
import pinterest from "../image/assets/pinterest.png";

import spring from "../image/assets/Spring.png";
import { toast } from "react-toastify";
import {
  logInFunction,
  validateemail,
} from "../configuration/authconfiguration";
import Loader from "../spinners/loader";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN, SET_NAME, isloggedInn } from "../redux/features/authSlicer";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const islog = useSelector(isloggedInn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = formData;
  const [showPassword, setShowPassword] = React.useState(false);
  const setHandleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Email or Password is missing");
    }

    if (!validateemail(email)) {
      return toast.error("Your email is not Valid");
    }

    if (password < 8) {
      return toast.error("your password is too short");
    }

    const LoginData = {
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await logInFunction(LoginData);
      await dispatch(SET_LOGIN(true));
      console.log(islog);
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    }
  };
  return (
    <Grid
      container
      sx={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 14%, rgba(15,168,144,0.0694328756893382) 52%, rgba(0,212,255,1) 79%, rgba(0,212,255,1) 80%)",
        height: "100%",
        width: "100%",
        position: "fixed",
        top: "0",
      }}
      justifyContent="center"
      alignItems="center"
      direction="row"
    >
      {isLoading ? <Loader /> : null}
      <Grid item>
        <Grid
          container
          sx={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "20px 0px 0 20px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            margin: "0",
          }}
          justifyContent="center"
          spacing={2}
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <Typography
              variant="h3"
              sx={{
                color: "black",
                fontWeight: "bolder",
              }}
            >
              Log in to your Account
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              sx={{
                color: "black",
                fontWeight: "bold",
              }}
              variant="p"
            >
              Login using social network
            </Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              marginBottom="5px"
              padding="0px 80px 0px 80px"
              justifyContent="space-between"
              direction="row"
            >
              <Grid item>
                <IconButton sx={{ p: 0 }}>
                  <Avatar src={facebook} alt="menu" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton sx={{ p: 0 }}>
                  <Avatar src={google} alt="menu" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton sx={{ p: 0 }}>
                  <Avatar src={pinterest} alt="menu" />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                marginBottom="20px"
                justifyContent="space-between"
                direction="row"
              >
                <Grid item>
                  <div
                    style={{
                      opacity: "0.6",
                      marginTop: "9px",
                      width: "200px",
                      border: "1px solid rgb(80,80,78)",
                    }}
                  ></div>
                </Grid>
                <Grid item>
                  <Typography variant="p">OR</Typography>
                </Grid>
                <Grid item>
                  <div
                    style={{
                      opacity: "0.6",
                      marginTop: "9px",
                      width: "200px",
                      border: "1px solid rgb(80,80,78)",
                    }}
                  ></div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <TextField
                  name="email"
                  sx={{
                    marginBottom: "10px",

                    "& .MuiOutlinedInput-root": { borderRadius: 5 },
                  }}
                  value={email}
                  onChange={setHandleInputChange}
                  label="Email"
                />
                <TextField
                  label="Password"
                  onChange={setHandleInputChange}
                  required
                  variant="outlined"
                  color="secondary"
                  type="password"
                  value={password}
                  name="password"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item>
              <Grid container justifyContent="center" direction="row">
                <Grid item>
                  <Button
                    sx={{
                      padding: "10px 30px 10px 30px",
                      fontSize: "20px",
                      borderRadius: "20px",
                    }}
                    onClick={login}
                    alignItems="center"
                    variant="contained"
                  >
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          sx={{
            backgroundImage: `url(${spring})`,
            height: "452px",
            backgroundPosition: "center",
            backgroundRepeat: "none",
            backgroundSize: "cover",
            padding: "0 40px 0 40px",
            borderRadius: "0 20px 20px 0",
          }}
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <Typography
              sx={{
                color: "White",
                backgroundColor: "rgba(19, 119, 150, 0.61)",
                fontWeight: "bolder",
                marginBottom: "15px",
              }}
              variant="h3"
            >
              New Users
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              sx={{
                fontWeight: "bolder",
                marginBottom: "15px",
              }}
              textAlign="center"
              variant="p"
            >
              you have to register first , to register <br /> click the down
              Button
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{
                padding: "10px 30px 10px 30px",
                fontSize: "15px",
                borderRadius: "20px",
                marginTop: "20px",
              }}
              variant="contained"
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
