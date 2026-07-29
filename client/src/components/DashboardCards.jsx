import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";

import HttpIcon from "@mui/icons-material/Http";
import SpeedIcon from "@mui/icons-material/Speed";
import ImageIcon from "@mui/icons-material/Image";
import StorageIcon from "@mui/icons-material/Storage";

function DashboardCards({ audit }) {
    if (!audit) return null;

    const statusColor =
        audit.status >= 200 && audit.status < 300
            ? "#2e7d32"
            : audit.status >= 400
                ? "#d32f2f"
                : "#ed6c02";

    const cards = [
        {
            title: "HTTP Status",
            value: audit.status,
            icon: <HttpIcon sx={{ fontSize: 45, color: statusColor }} />,
            color: statusColor,
        },
        {
            title: "Response Time",
            value: `${audit.responseTime} ms`,
            icon: <SpeedIcon sx={{ fontSize: 45, color: "#1976d2" }} />,
            color: "#1976d2",
        },
        {
            title: "Images",
            value: audit.images,
            icon: <ImageIcon sx={{ fontSize: 45, color: "#ed6c02" }} />,
            color: "#ed6c02",
        },
        {
            title: "Page Size",
            value: `${audit.pageSize} KB`,
            icon: <StorageIcon sx={{ fontSize: 45, color: "#9c27b0" }} />,
            color: "#9c27b0",
        },
    ];

    return (
        <Grid container spacing={3}>
            {cards.map((card) => (
                <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={3}
                    key={card.title}
                >
                    <Card
                        className="dashboard-card"
                        elevation={5}
                        sx={{
                            borderRadius: 4,
                            height: "100%",
                        }}
                    >
                        <CardContent>

                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Box>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {card.title}
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        sx={{
                                            mt: 1,
                                            fontWeight: "bold",
                                            color: card.color,
                                        }}
                                    >
                                        {card.value}
                                    </Typography>

                                </Box>

                                {card.icon}

                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default DashboardCards;