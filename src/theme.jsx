// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#222222", // Light Green
      main: "#333333", // Green
      dark: "#558b2f", // Dark Green
      contrastText: "#ffffff", // White
    },
    secondary: {
      light: "#ffb74d", // Light Orange
      main: "rgb(17, 184, 203)",
      dark: "#f57c00", // Dark Orange
      contrastText: "#ffffff", // White
    },
    error: {
      light: "#ef9a9a", // Light Red
      main: "#f44336", // Red
      dark: "#d32f2f", // Dark Red
      contrastText: "#ffffff", // White
    },
    success: {
      light: "#81c784", // Light Green
      main: "#4caf50", // Green
      dark: "#388e3c", // Dark Green
      contrastText: "#ffffff", // White
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff", // White
    },
    text: {
      primary: "#212121", // Almost Black
      secondary: "#757575", // Grey
    },
  },
  typography: {
    fontFamily: ["Inter", "Roboto", "Helvetica", "Arial", "sans-serif"].join(
      ","
    ),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          padding: "5px 10px",
        },
        containedPrimary: {
          boxShadow: "0 4px 12px rgba(63, 81, 181, 0.4)",
        },
        containedSecondary: {
          boxShadow: "0 4px 12px rgba(92, 107, 192, 0.4)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
        },
      },
    },
  },
});

export default theme;
