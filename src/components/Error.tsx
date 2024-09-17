import React from "react";

const Error = () => {
  return (
    <div
      className="me-2 rounded-md border border-red-400 bg-red-100 px-4 py-3 text-lg text-red-700 hover:bg-red-400"
      role="alert"
    >
      <strong className="font-bold">Ups! </strong>
      <span className="block sm:inline">
        Something seriously bad happened.
      </span>
    </div>
  );
};

export default Error;
