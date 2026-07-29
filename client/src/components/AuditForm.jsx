import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Paper,
    InputAdornment,
} from "@mui/material";

import LanguageIcon from "@mui/icons-material/Language";
import SearchIcon from "@mui/icons-material/Search";

function AuditForm({ onAudit, loading }) {
    const [url, setUrl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!url.trim()) {
            alert("Please enter a website URL.");
            return;
        }

        let website = url.trim();

        // Automatically add https:// if missing
        if (
            !website.startsWith("http://") &&
            !website.startsWith("https://")
        ) {
            website = "https://" + website;
        }

        onAudit(website);
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                backgroundColor: "transparent",
            }}
        >
            <form onSubmit={handleSubmit}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        flexDirection: {
                            xs: "column",
                            md: "row",
                        },
                    }}
                >
                    <TextField
                        fullWidth
                        label="Website URL"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LanguageIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        startIcon={<SearchIcon />}
                        sx={{
                            minWidth: 200,
                            height: 56,
                            fontWeight: "bold",
                            borderRadius: 2,
                        }}
                    >
                        {loading ? "Auditing..." : "Audit Website"}
                    </Button>
                </Box>
            </form>
        </Paper>
    );
}

export default AuditForm;