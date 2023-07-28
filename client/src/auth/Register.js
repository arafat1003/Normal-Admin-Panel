import {
  Grid,
  TextField,
  Typography,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import spring from "../image/assets/Spring.png";
import "../stylesheet/register.css";
import { toast } from "react-toastify";
import {
  authFunction,
  validateemail,
} from "../configuration/authconfiguration";
import Loader from "../spinners/loader";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN, SET_NAME } from "../redux/features/authSlicer";

const initialState = {
  name: "",
  email: "",
  password: "",
  phonenumber: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = React.useState(false);
  const { name, email, password, phonenumber } = formData;

  const setHandleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const register = async (event) => {
    event.preventDefault();
    console.log();

    if (!name || !email || !password || !phonenumber) {
      return toast.error("no nformation is added ");
    }

    if (!validateemail(email)) {
      return toast.error("email is not correct");
    }

    const userData = {
      name,
      email,
      password,
      phonenumber: formData.phonenumber,
    };
    setIsLoading(true);
    try {
      const data = await authFunction(userData);
      console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
    } catch (error) {
      toast.error(error);
      console.log(error);
    } finally {
      setIsLoading(false); // Set isLoading to false after the API call
    }

    console.log(formData);
  };
  return (
    <form onSubmit={register}>
      {isLoading ? <Loader /> : null}
      <Grid
        container
        sx={{
          height: "100%",
          width: "100%",
          position: "fixed",
          top: "0",
          background: "linear-gradient(to right, #ee9ca7, #ffdde1)",
        }}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid item>
          <Grid
            container
            sx={{
              backgroundColor: "white",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              paddingLeft: "15px",
              borderRadius: "20px",
            }}
            alignItems="center"
            direction="row"
          >
            <Grid item>
              <Grid
                container
                alignItems="center"
                spacing={2}
                direction="column"
              >
                <Grid item>
                  <Typography textAlign="center" variant="h2">
                    Create an account
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    sx={{
                      marginBottom: "15px",
                    }}
                    variant="p"
                  >
                    Sign up now and unlock various offers
                  </Typography>
                </Grid>

                <Grid
                  item
                  sx={{
                    width: "100%",
                  }}
                >
                  <Grid
                    container
                    direction="column"
                    sx={{
                      width: "100%",
                    }}
                  >
                    <TextField
                      name="name"
                      value={name}
                      onChange={setHandleInputChange}
                      InputLabelProps={{ style: { fontSize: 20 } }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                      id="full-width-text-field"
                      sx={{
                        marginBottom: "20px",
                        width: "300",

                        "& .MuiOutlinedInput-root": { borderRadius: 5 },
                      }}
                      label="Name"
                    />

                    <TextField
                      name="email"
                      value={email}
                      onChange={setHandleInputChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                      InputLabelProps={{ style: { fontSize: 20 } }}
                      sx={{
                        marginBottom: "20px",

                        "& .MuiOutlinedInput-root": { borderRadius: 5 },
                      }}
                      label="E mail"
                    />

                    <TextField
                      name="password"
                      value={password}
                      onChange={setHandleInputChange}
                      sx={{
                        marginBottom: "10px",

                        "& .MuiOutlinedInput-root": { borderRadius: 5 },
                      }}
                      variant="outlined"
                    >
                      <InputLabel
                        position="start"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start"></InputAdornment>
                          ),
                        }}
                        htmlFor="outlined-adornment-password"
                      >
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </TextField>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="row">
                    <TextField
                      name="phonenumber"
                      value={phonenumber}
                      onChange={setHandleInputChange}
                    />
                  </Grid>
                </Grid>

                <Grid item>
                  <Button
                    type="submit"
                    sx={{
                      padding: "10px 90px",
                      color: "red",
                      backgroundColor: "gray",
                      "&:hover": {
                        backgroundColor: "yellow",
                      },
                    }}
                    variant="contained"
                  >
                    Register
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    sx={{
                      padding: "10px 90px",
                      marginBottom: "20px",
                    }}
                    variant="contained"
                  >
                    Sign in
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <img
                style={{
                  padding: "10px",
                }}
                src={spring}
                alt="spris"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Register;
