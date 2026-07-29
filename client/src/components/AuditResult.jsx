import {
    Card,
    CardContent,
    Typography,
    Divider,
    Stack,
    Chip,
} from "@mui/material";

function AuditResult({ audit }) {
    if (!audit) return null;

    return (
        <Card elevation={4}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Website Details
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Stack spacing={2}>
                    <Typography>
                        <strong>Title:</strong>{" "}
                        {audit.title || "Not Available"}
                    </Typography>

                    <Typography>
                        <strong>URL:</strong> {audit.url}
                    </Typography>

                    <Typography>
                        <strong>Meta Description:</strong>{" "}
                        {audit.metaDescription ? "Available" : "Missing"}
                    </Typography>

                    <Typography>
                        <strong>Missing ALT Tags:</strong>{" "}
                        {audit.missingAlt}
                    </Typography>

                    <Typography>
                        <strong>Cached:</strong>{" "}
                        {audit.cached ? "Yes" : "No"}
                    </Typography>

                    <div>
                        <Typography mb={1}>
                            <strong>Security Headers</strong>
                        </Typography>

                        {audit.securityHeaders?.length ? (
                            audit.securityHeaders.map((header) => (
                                <Chip
                                    key={header}
                                    label={header}
                                    color="success"
                                    sx={{ mr: 1, mb: 1 }}
                                />
                            ))
                        ) : (
                            <Typography color="error">
                                No security headers detected
                            </Typography>
                        )}
                    </div>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default AuditResult;