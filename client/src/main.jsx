import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";

import {
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

import App from "./App";
import getTheme from "./theme";
import "./App.css";

function Root() {

  const [mode, setMode] = useState(
    localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {

    const newMode =
      mode === "light"
        ? "dark"
        : "light";

    setMode(newMode);

    localStorage.setItem(
      "theme",
      newMode
    );
  };

  const theme = useMemo(
    () => getTheme(mode),
    [mode]
  );

  return (

    <ThemeProvider theme={theme}>

      <CssBaseline />

      <App
        mode={mode}
        toggleTheme={toggleTheme}
      />

    </ThemeProvider>

  );
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);