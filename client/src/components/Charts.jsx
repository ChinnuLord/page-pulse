import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Line, Bar, Pie } from "react-chartjs-2";

import {
    Grid,
    Paper,
    Typography,
} from "@mui/material";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function Charts({ history }) {

    if (!history || history.length === 0) return null;

    const labels = history.map((item) =>
        item.url.replace(/^https?:\/\//, "")
    );

    /* ---------- Response Time Chart ---------- */

    const responseChart = {
        labels,
        datasets: [
            {
                label: "Response Time (ms)",
                data: history.map((item) => item.responseTime),
                borderColor: "#1976d2",
                backgroundColor: "rgba(25,118,210,.25)",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    /* ---------- Status Chart ---------- */

    const statusChart = {
        labels,
        datasets: [
            {
                label: "HTTP Status",
                data: history.map((item) => item.status),
                backgroundColor: history.map((item) => {
                    if (item.status >= 200 && item.status < 300)
                        return "#2e7d32";

                    if (item.status >= 400)
                        return "#d32f2f";

                    return "#ed6c02";
                }),
            },
        ],
    };

    /* ---------- Cached Pie ---------- */

    const cachedCount = history.filter(
        (item) => item.cached
    ).length;

    const uncachedCount = history.length - cachedCount;

    const pieChart = {
        labels: ["Cached", "Not Cached"],

        datasets: [
            {
                data: [cachedCount, uncachedCount],

                backgroundColor: [
                    "#2e7d32",
                    "#d32f2f",
                ],
            },
        ],
    };

    return (
        <Grid container spacing={3}>

            {/* Response Time */}

            <Grid item xs={12} lg={6}>

                <Paper
                    elevation={5}
                    sx={{ p: 3 }}
                >

                    <Typography
                        variant="h6"
                        mb={2}
                        fontWeight="bold"
                    >
                        Response Time
                    </Typography>

                    <Line data={responseChart} />

                </Paper>

            </Grid>

            {/* Status */}

            <Grid item xs={12} lg={6}>

                <Paper
                    elevation={5}
                    sx={{ p: 3 }}
                >

                    <Typography
                        variant="h6"
                        mb={2}
                        fontWeight="bold"
                    >
                        HTTP Status
                    </Typography>

                    <Bar data={statusChart} />

                </Paper>

            </Grid>

            {/* Cached */}

            <Grid item xs={12}>

                <Paper
                    elevation={5}
                    sx={{
                        p: 3,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >

                    <div
                        style={{
                            width: 350,
                        }}
                    >

                        <Typography
                            variant="h6"
                            align="center"
                            mb={2}
                            fontWeight="bold"
                        >
                            Cache Statistics
                        </Typography>

                        <Pie data={pieChart} />

                    </div>

                </Paper>

            </Grid>

        </Grid>
    );
}

export default Charts;