import React from "react";

export const Button = ({ text, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg shadow-md transition ${className}`}
  >
    {text}
  </button>
);
