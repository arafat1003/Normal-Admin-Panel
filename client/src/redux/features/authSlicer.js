import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
const name = JSON.parse(localStorage.getItem("name")) || "";

const initialState = {
  isLoggedIn: false,
  name: name ? name : "",
  user: {
    name: "",
    email: "",
    password: "",
    phonenumber: "",
    photo: "",
  },
  userId: "",
};

const authSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.password = profile.password;
      state.user.phonenumber = profile.phonenumber;
      state.user.photo = profile.photo;
    },
  },
});

export const { SET_LOGIN, SET_USER, SET_NAME } = authSlicer.actions;

export const isloggedInn = (state) => {
  return state.auth.isLoggedIn;
};

export const nameoftheuser = (state) => {
  return state.auth.name;
};

export const userall = (state) => {
  return state.auth.user;
};

export default authSlicer.reducer;
