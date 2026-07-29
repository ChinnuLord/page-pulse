import {
    Box,
    Typography,
    Stack,
    IconButton,
    Link,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                mt: 8,
                py: 4,
                borderTop: "1px solid #e0e0e0",
                textAlign: "center",
            }}
        >
            <Typography
                variant="h6"
                fontWeight="bold"
            >
                🚀 Page Pulse
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
            >
                Website Performance & SEO Audit Dashboard
            </Typography>

            <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                sx={{ mt: 2 }}
            >
                <IconButton
                    color="primary"
                    href="https://github.com"
                    target="_blank"
                >
                    <GitHubIcon />
                </IconButton>

                <IconButton
                    color="primary"
                    href="https://linkedin.com"
                    target="_blank"
                >
                    <LinkedInIcon />
                </IconButton>

                <IconButton
                    color="primary"
                    href="/"
                >
                    <LanguageIcon />
                </IconButton>
            </Stack>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2 }}
            >
                © {new Date().getFullYear()} Page Pulse.
                Built with React, Material UI, Express &
                MongoDB.
            </Typography>

            <Typography
                variant="caption"
                color="text.secondary"
            >
                Developed by Sathvik HN
            </Typography>
        </Box>
    );
}

export default Footer;