import axios from "axios";
import { BACKEND_URL } from "../constants";

export const register = async (data) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/auth/register`, data);
    return response;
  } catch (err) {
    return err;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/auth/login`, data);
    return response;
  } catch (error) {
    return error;
  }
};
