import React from "react";
import UserTable from "./components/UserTable";

const App = () => {
  return (
    <div className="m-auto h-screen max-w-[1366px] px-5 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
      <UserTable />
    </div>
  );
};

export default App;
