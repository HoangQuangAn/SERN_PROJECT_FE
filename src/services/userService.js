import axios from "../axios";
const handleLogin = (userEamil, userPassword) => {
  return axios.post("/api/login", { email: userEamil, password: userPassword });
};

const getAllUser = (inputId) => {
  return axios.get(`/api/get-all-users/${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};
export { handleLogin, getAllUser, createNewUserService };
