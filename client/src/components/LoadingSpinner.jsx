import {
    Box,
    CircularProgress,
    Typography,
    Fade,
} from "@mui/material";

import LanguageIcon from "@mui/icons-material/Language";

function LoadingSpinner() {
    return (
        <Fade in timeout={300}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 6,
                    gap: 2,
                }}
            >
                <LanguageIcon
                    sx={{
                        fontSize: 60,
                        color: "primary.main",
                    }}
                />

                <CircularProgress
                    size={60}
                    thickness={4}
                />

                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    Auditing Website...
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Please wait while we analyze the website.
                </Typography>
            </Box>
        </Fade>
    );
}

export default LoadingSpinner;