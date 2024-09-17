import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchUsers } from "../api/apiCalls";
import { filterUsers } from "../redux/userSlice";
import { HiOutlineSearch } from "react-icons/hi";
import Loader from "./Loader";
import Error from "./Error";

const UserTable = () => {
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

  return (
    <div className="w-full">
      <h1 className="flex items-center justify-center p-5 text-4xl font-thin">
        User Management Table
      </h1>

      {/* LOADER or ERROR */}
      {pending && <Loader />}
      {error && <Error />}

      {/* TABLE */}
      {!pending && !error && (
        <table className="w-full border-separate border-spacing-1 rounded-md border border-slate-700 p-5">
          <thead>
            <tr>
              <th>
                <div className="flex flex-col items-center gap-4">
                  <h3 className="w-full rounded-sm border border-slate-300 bg-indigo-100 p-2 text-xl font-semibold">
                    Name
                  </h3>
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="search by name"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      className="w-full rounded-sm border-b border-indigo-700 bg-slate-100 p-2 pr-10 font-thin outline-none focus:ring-1"
                    />
                    <HiOutlineSearch className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
                  </div>
                </div>
              </th>
              <th>
                <div className="flex flex-col items-center gap-4">
                  <h3 className="w-full rounded-sm border border-slate-300 bg-indigo-100 p-2 text-xl font-semibold">
                    Username
                  </h3>
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="search by username"
                      value={searchUsername}
                      onChange={(e) => setSearchUsername(e.target.value)}
                      className="w-full rounded-sm border-b border-indigo-700 bg-slate-100 p-2 pr-10 font-thin outline-none focus:ring-1"
                    />
                    <HiOutlineSearch className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
                  </div>
                </div>
              </th>
              <th>
                <div className="flex flex-col items-center gap-4">
                  <h3 className="w-full rounded-sm border border-slate-300 bg-indigo-100 p-2 text-xl font-semibold">
                    Email
                  </h3>
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="search by email"
                      value={searchEmail}
                      onChange={(e) => setSearchEmail(e.target.value)}
                      className="w-full rounded-sm border-b border-indigo-700 bg-slate-100 p-2 pr-10 font-thin outline-none focus:ring-1"
                    />
                    <HiOutlineSearch className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
                  </div>
                </div>
              </th>
              <th>
                <div className="flex flex-col items-center gap-4">
                  <h3 className="w-full rounded-sm border border-slate-300 bg-indigo-100 p-2 text-xl font-semibold">
                    Phone
                  </h3>
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="search by phone"
                      value={searchPhone}
                      onChange={(e) => setSearchPhone(e.target.value)}
                      className="w-full rounded-sm border-b border-indigo-700 bg-slate-100 p-2 pr-10 font-thin outline-none focus:ring-1"
                    />
                    <HiOutlineSearch className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                className="transition-all duration-300 hover:scale-[102%] hover:bg-indigo-200 hover:font-semibold"
                key={user.id}
              >
                <td className="rounded-sm border border-slate-300 p-2">
                  {user.name}
                </td>
                <td className="rounded-sm border border-slate-300 p-2">
                  {user.username}
                </td>
                <td className="rounded-sm border border-slate-300 p-2">
                  {user.email.toLowerCase()}
                </td>
                <td className="rounded-sm border border-slate-300 p-2">
                  {user.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
