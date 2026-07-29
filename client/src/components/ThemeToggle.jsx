import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function ThemeToggle({ mode, toggleTheme }) {
    return (
        <Tooltip
            title={
                mode === "light"
                    ? "Switch to Dark Mode"
                    : "Switch to Light Mode"
            }
        >
            <IconButton
                color="inherit"
                onClick={toggleTheme}
            >
                {mode === "light"
                    ? <DarkModeIcon />
                    : <LightModeIcon />}
            </IconButton>
        </Tooltip>
    );
}

export default ThemeToggle;