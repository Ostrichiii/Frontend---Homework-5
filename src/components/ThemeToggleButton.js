import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  console.log("ThemeToggleButton rendered!"); // Debugging log
  return (
    <button
      onClick={toggleTheme}
      className={`ml-4 p-2 rounded ${
        theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
      }`}
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ThemeToggleButton;