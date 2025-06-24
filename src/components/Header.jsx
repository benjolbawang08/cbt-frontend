import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  Avatar,
  Chip,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

// Soft Pastel Theme
const softPastelTheme = {
  gradient:
    "linear-gradient(135deg,rgb(17, 101, 203) 0%,rgb(147, 32, 201) 100%)",
  background: "rgba(255, 255, 255, 0.9)",
  blur: "blur(15px)",
  shadow: "0 8px 20px rgba(0,0,0,0.1)",
};

// Styled Components with Gen Z Aesthetic
const SoftAppBar = styled(AppBar)({
  background: softPastelTheme.gradient,
  backdropFilter: softPastelTheme.blur,
  boxShadow: softPastelTheme.shadow,
});

const NeumoButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  textTransform: "none",
  fontWeight: 600,
  padding: "8px 16px",
  background: "linear-gradient(145deg, #f0f5fc, #cacfd8)",
  boxShadow: "3px 3px 6px #b1b7c0, -3px -3px 6px #ffffff",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "5px 5px 10px #b1b7c0, -5px -5px 10px #ffffff",
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    navigate("/login");
    setMobileOpen(false);
  };

  const MenuItems = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 2,
        alignItems: "center",
      }}
    >
      {!token ? (
        <>
          <NeumoButton
            startIcon={<HomeRoundedIcon />}
            component={Link}
            to="/"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </NeumoButton>
          <NeumoButton
            color="primary.main"
            startIcon={<LoginRoundedIcon />}
            component={Link}
            to="/login"
            onClick={() => setMobileOpen(false)}
          >
            Login
          </NeumoButton>
          <NeumoButton
            variant="contained"
            color="primary.main"
            startIcon={<PersonAddRoundedIcon />}
            component={Link}
            to="/register"
            onClick={() => setMobileOpen(false)}
          >
            Register
          </NeumoButton>
        </>
      ) : (
        <>
          <NeumoButton
            startIcon={<DashboardRoundedIcon />}
            component={Link}
            to="/dashboard"
            onClick={() => setMobileOpen(false)}
          >
            Dashboard
          </NeumoButton>
          <NeumoButton
            startIcon={<PersonRoundedIcon />}
            component={Link}
            to="/profile"
            onClick={() => setMobileOpen(false)}
          >
            Profile
          </NeumoButton>
          <Chip
            avatar={<Avatar>U</Avatar>}
            label="Logout"
            onClick={handleLogout}
            deleteIcon={<LogoutRoundedIcon />}
            onDelete={handleLogout}
            color="secondary"
            variant="outlined"
          />
        </>
      )}
    </Box>
  );

  return (
    <SoftAppBar position="static">
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              background:
                "linear-gradient(45deg,rgb(243, 243, 247),rgb(8, 193, 181))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            onClick={() => navigate("/")}
          >
            STEMSA-CBT
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>

              <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                sx={{
                  "& .MuiDrawer-paper": {
                    width: "250px",
                    background: softPastelTheme.background,
                    backdropFilter: softPastelTheme.blur,
                  },
                }}
              >
                <Box sx={{ padding: 2 }}>
                  <MenuItems />
                </Box>
              </Drawer>
            </>
          ) : (
            <MenuItems />
          )}
        </Toolbar>
      </Container>
    </SoftAppBar>
  );
};

export default Header;
