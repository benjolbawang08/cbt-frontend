// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#a7c0cd",
      main: "#78909c",
      dark: "#4b636e",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ffcccb",
      main: "#ffab91",
      dark: "#c97b63",
      contrastText: "#ffffff",
    },
    error: {
      light: "#ef9a9a",
      main: "#e57373",
      dark: "#d32f2f",
      contrastText: "#ffffff",
    },
    success: {
      light: "#a5d6a7",
      main: "#81c784",
      dark: "#4caf50",
      contrastText: "#ffffff",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
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
