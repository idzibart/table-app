import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { fetchUsers } from "./api/apiCalls";
import { filterUsers } from "./redux/userSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.filteredUsers);
  const pending = useSelector((state: RootState) => state.user.pending);
  const error = useSelector((state: RootState) => state.user.error);

  const [searchName, setSearchName] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");

  useEffect(() => {
    fetchUsers(dispatch);
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      filterUsers({
        name: searchName,
        username: searchUsername,
        email: searchEmail,
        phone: searchPhone,
      }),
    );
  }, [searchName, searchUsername, searchEmail, searchPhone, dispatch]);

  if (pending) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div>
      <h1>User Management Table</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by username"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by phone"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email.toLowerCase()}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
