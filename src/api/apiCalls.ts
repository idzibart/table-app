import axios from "axios";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "../redux/userSlice";

export const fetchUsers = async (dispatch: any) => {
  dispatch(fetchUsersStart());
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    dispatch(fetchUsersSuccess(res.data));
    console.log(res.data);
  } catch (err) {
    dispatch(fetchUsersFailure());
  }
};

