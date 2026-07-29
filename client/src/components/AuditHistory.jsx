import { useEffect, useState } from "react";
import {
    Paper,
    Typography,
    Chip,
    Box,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import api from "../services/api";

function AuditHistory({ refresh, onHistoryLoaded }) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchHistory();
    }, [refresh]);

    const fetchHistory = async () => {
        try {
            setLoading(true);

            const response = await api.get("/audit");

            const audits = response.data.audits || [];

            const formatted = audits.map((audit) => ({
                id: audit._id,
                url: audit.url,
                status: audit.status,
                responseTime: audit.responseTime,
                images: audit.images,
                pageSize: audit.pageSize,
                cached: audit.cached,
                createdAt: new Date(
                    audit.createdAt
                ).toLocaleString(),
            }));

            setRows(formatted);

            if (onHistoryLoaded) {
                onHistoryLoaded(formatted);
            }
        } catch (err) {
            console.error("History Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            field: "url",
            headerName: "Website",
            flex: 2,
            minWidth: 220,
        },

        {
            field: "status",
            headerName: "Status",
            width: 120,

            renderCell: (params) => {

                let color = "warning";

                if (
                    params.value >= 200 &&
                    params.value < 300
                ) {
                    color = "success";
                } else if (params.value >= 400) {
                    color = "error";
                }

                return (
                    <Chip
                        label={params.value}
                        color={color}
                        size="small"
                    />
                );
            },
        },

        {
            field: "responseTime",
            headerName: "Response (ms)",
            width: 150,
        },

        {
            field: "images",
            headerName: "Images",
            width: 100,
        },

        {
            field: "pageSize",
            headerName: "Page Size (KB)",
            width: 140,
        },

        {
            field: "cached",
            headerName: "Cached",
            width: 110,

            renderCell: (params) => (
                <Chip
                    label={params.value ? "Yes" : "No"}
                    color={
                        params.value
                            ? "success"
                            : "default"
                    }
                    size="small"
                />
            ),
        },

        {
            field: "createdAt",
            headerName: "Created",
            flex: 1,
            minWidth: 180,
        },
    ];

    return (
        <Paper
            elevation={5}
            sx={{
                p: 3,
                borderRadius: 4,
            }}
        >
            <Typography
                variant="h5"
                fontWeight="bold"
                mb={3}
            >
                Audit History
            </Typography>

            <Box sx={{ height: 450 }}>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    disableRowSelectionOnClick
                    pageSizeOptions={[5, 10, 20]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    sx={{
                        border: 0,

                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#1976d2",
                            color: "#fff",
                            fontWeight: "bold",
                        },

                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: "#f5f5f5",
                        },
                    }}
                />

            </Box>

        </Paper>
    );
}

export default AuditHistory;