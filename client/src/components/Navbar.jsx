import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Tooltip,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";

import ThemeToggle from "./ThemeToggle";

function Navbar({ mode, toggleTheme }) {
    return (
        <AppBar
            position="sticky"
            elevation={3}
        >
            <Toolbar>
                <LanguageIcon
                    sx={{
                        mr: 1,
                        fontSize: 30,
                    }}
                />

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        flexGrow: 1,
                    }}
                >
                    Page Pulse
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <ThemeToggle
                        mode={mode}
                        toggleTheme={toggleTheme}
                    />

                    <Tooltip title="GitHub Repository">
                        <IconButton
                            color="inherit"
                            href="https://github.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GitHubIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;