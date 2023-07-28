import axios from "axios";
import { toast } from "react-toastify";

const BackEND_URL = "http://localhost:5000";
const api = axios.create({
  baseURL: BackEND_URL,
  withCredentials: true,
  credentials: "include",
  headers: { "Content-Type": "application/json" },
});
export const validateemail = (email) => {
  return email.match(
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
};
//Register User
export const authFunction = async (UserData) => {
  try {
    const response = await axios.post(`${BackEND_URL}/v1/hello/hii`, UserData, {
      withCredentials: true,
    });
    if (response.statusText === "OK") {
      toast.success("regestration is Successful");
    } else {
      toast.error("regestration is not successful");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const logInFunction = async (UserData) => {
  try {
    const response = await api.post(`${BackEND_URL}/v1/hello/hii2`, UserData);
    if (response.statusText === "OK") {
      toast.success("Log In is Successful");
    } else {
      toast.error("Log In is not successful");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const logOutFunction = async () => {
  try {
    await axios.get(`${BackEND_URL}/v1/hello/hii3`);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const ResetFunction = async (UserData) => {
  try {
    const response = await axios.post(
      `${BackEND_URL}/v1/hello/resetpassword`,
      UserData
    );
    if (response.statusText === "OK") {
      toast.success(response.data.message);
    } else {
      toast.error("Log In is not successful");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const ForgotFunction = async (UserData, hashToken) => {
  try {
    const response = await axios.put(
      `${BackEND_URL}/v1/hello/forgotpassword/${hashToken}`,
      UserData
    );

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const loginStatus = async () => {
  try {
    const response = await axios.get(`${BackEND_URL}/v1/hello/hii5`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message, "Hiii");
  }
};

export const ProfileStatus = async () => {
  try {
    const response = await axios.get(`${BackEND_URL}/v1/hello/hii4`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message, "Hiii");
  }
};

export const UpdateStatus = async (formData) => {
  try {
    const response = await axios.patch(
      `${BackEND_URL}/v1/hello/hii6`,
      formData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message, "Hiii");
  }
};
