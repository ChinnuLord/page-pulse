import { useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

import Navbar from "./components/Navbar";
import AuditForm from "./components/AuditForm";
import DashboardCards from "./components/DashboardCards";
import AuditDetails from "./components/AuditDetails";
import AuditHistory from "./components/AuditHistory";
import Charts from "./components/Charts";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

import api from "./services/api";

function App({ mode, toggleTheme }) {
  const [audit, setAudit] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const performAudit = async (url) => {
    try {
      setLoading(true);

      const response = await api.post("/audit", {
        url,
      });

      if (response.data.success) {
        setAudit(response.data.audit);

        setRefresh((prev) => !prev);

        setSnackbar({
          open: true,
          severity: "success",
          message: "Website audited successfully!",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        severity: "error",
        message:
          error.response?.data?.message ||
          "Audit failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar
        mode={mode}
        toggleTheme={toggleTheme}
      />

      <Container
        maxWidth="lg"
        sx={{ mt: 5, mb: 5 }}
      >
        {/* Hero Section */}

        <Paper
          elevation={4}
          sx={{
            p: 4,
            mb: 4,
            textAlign: "center",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
          >
            Page Pulse
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
          >
            Analyze Website Performance, SEO,
            Images, Security Headers and More
          </Typography>
        </Paper>

        {/* Audit Form */}

        <AuditForm onAudit={performAudit} />

        {/* Loading */}

        {loading && <LoadingSpinner />}

        {/* Dashboard */}

        {!loading && audit && (
          <>
            <Box mt={5}>
              <DashboardCards audit={audit} />
            </Box>

            <Box mt={4}>
              <AuditDetails audit={audit} />
            </Box>
          </>
        )}

        {/* History */}

        <Box mt={5}>
          <AuditHistory
            refresh={refresh}
            onHistoryLoaded={setHistory}
          />
        </Box>

        {/* Charts */}

        <Box mt={5}>
          <Charts history={history} />
        </Box>

        <Footer />
      </Container>

      {/* Snackbar */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}


export default App;