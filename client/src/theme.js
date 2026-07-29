import { createTheme } from "@mui/material/styles";

const getTheme = (mode) =>
    createTheme({
        palette: {
            mode,

            primary: {
                main: "#1976d2",
            },

            secondary: {
                main: "#9c27b0",
            },

            background: {
                default:
                    mode === "light"
                        ? "#f4f6f8"
                        : "#121212",

                paper:
                    mode === "light"
                        ? "#ffffff"
                        : "#1e1e1e",
            },
        },

        shape: {
            borderRadius: 12,
        },

        typography: {
            fontFamily: "Roboto, sans-serif",

            button: {
                textTransform: "none",
            },
        },
    });

export default getTheme;