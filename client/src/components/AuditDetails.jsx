import {
    Card,
    CardContent,
    Typography,
    Grid,
    Chip,
    Divider,
    Stack,
    Box,
} from "@mui/material";

import PublicIcon from "@mui/icons-material/Public";
import DescriptionIcon from "@mui/icons-material/Description";
import SecurityIcon from "@mui/icons-material/Security";
import ImageIcon from "@mui/icons-material/Image";
import StorageIcon from "@mui/icons-material/Storage";

function AuditDetails({ audit }) {
    if (!audit) return null;

    return (
        <Card elevation={5} sx={{ borderRadius: 4 }}>
            <CardContent>

                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Website Details
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>

                    {/* Left Side */}

                    <Grid item xs={12} md={6}>

                        <Stack spacing={3}>

                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    <PublicIcon
                                        sx={{ mr: 1, verticalAlign: "middle" }}
                                    />
                                    Website URL
                                </Typography>

                                <Typography variant="body1">
                                    {audit.url}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    <DescriptionIcon
                                        sx={{ mr: 1, verticalAlign: "middle" }}
                                    />
                                    Title
                                </Typography>

                                <Typography variant="body1">
                                    {audit.title || "Not Available"}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Meta Description
                                </Typography>

                                <Chip
                                    label={
                                        audit.metaDescription
                                            ? "Available"
                                            : "Missing"
                                    }
                                    color={
                                        audit.metaDescription
                                            ? "success"
                                            : "error"
                                    }
                                />
                            </Box>

                        </Stack>

                    </Grid>

                    {/* Right Side */}

                    <Grid item xs={12} md={6}>

                        <Stack spacing={3}>

                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    <ImageIcon
                                        sx={{ mr: 1, verticalAlign: "middle" }}
                                    />
                                    Missing ALT Tags
                                </Typography>

                                <Chip
                                    label={audit.missingAlt}
                                    color={
                                        audit.missingAlt === 0
                                            ? "success"
                                            : "warning"
                                    }
                                />
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    <StorageIcon
                                        sx={{ mr: 1, verticalAlign: "middle" }}
                                    />
                                    Cached
                                </Typography>

                                <Chip
                                    label={audit.cached ? "Yes" : "No"}
                                    color={
                                        audit.cached
                                            ? "success"
                                            : "default"
                                    }
                                />
                            </Box>

                            <Box>

                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    <SecurityIcon
                                        sx={{ mr: 1, verticalAlign: "middle" }}
                                    />
                                    Security Headers
                                </Typography>

                                {audit.securityHeaders &&
                                    audit.securityHeaders.length > 0 ? (

                                    audit.securityHeaders.map((header) => (
                                        <Chip
                                            key={header}
                                            label={header}
                                            color="primary"
                                            sx={{
                                                mr: 1,
                                                mb: 1,
                                            }}
                                        />
                                    ))

                                ) : (

                                    <Typography color="error">
                                        No Security Headers Found
                                    </Typography>

                                )}

                            </Box>

                        </Stack>

                    </Grid>

                </Grid>

            </CardContent>
        </Card>
    );
}

export default AuditDetails;