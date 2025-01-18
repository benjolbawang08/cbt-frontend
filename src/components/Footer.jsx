import React from "react";
import {
  Container,
  Typography,
  Link,
  Box,
  Grid,
  IconButton,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";

// Create a calm theme
const calmTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5a6374", // Soft muted blue-gray
    },
    secondary: {
      main: "#f4f6f7", // Very light gray-blue background
    },
    text: {
      primary: "#2c3e50", // Deep, soft charcoal
      secondary: "#7f8c8d", // Soft gray
    },
  },
  typography: {
    fontFamily: ["Inter", "Roboto", "Helvetica", "Arial", "sans-serif"].join(
      ","
    ),
    h6: {
      fontWeight: 600,
      color: "#2c3e50",
    },
    body2: {
      color: "#7f8c8d",
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "transparent",
            transform: "scale(1.1)",
          },
        },
      },
    },
  },
});

const CalmFooter = () => {
  const currentYear = new Date().getFullYear();
  const ownerName = "Siti Wahyuni";

  const socialLinks = [
    {
      icon: <FacebookIcon />,
      color: "#3b5998",
      href: "#facebook",
    },
    {
      icon: <TwitterIcon />,
      color: "#1da1f2",
      href: "#twitter",
    },
    {
      icon: <InstagramIcon />,
      color: "#c32aa3",
      href: "#instagram",
    },
    {
      icon: <LinkedInIcon />,
      color: "#0077b5",
      href: "#linkedin",
    },
  ];

  return (
    <ThemeProvider theme={calmTheme}>
      <Box
        component="footer"
        sx={{
          backgroundColor: "secondary.main",
          py: 4,
          boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Left Section */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                }}
              >
                CBT Application
              </Typography>

              <Typography variant="body2">
                © {currentYear} All Rights Reserved
              </Typography>

              <Typography variant="body2" sx={{ mt: 1 }}>
                Crafted by{" "}
                <Link
                  href="#"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    fontWeight: 600,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {ownerName}
                </Link>
              </Typography>
            </Grid>

            {/* Right Section */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                textAlign: { xs: "center", md: "right" },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  color: "text.secondary",
                }}
              >
                Connect with me
              </Typography>

              <Box>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    href={social.href}
                    target="_blank"
                    sx={{
                      color: social.color,
                      opacity: 0.7,
                      "&:hover": {
                        opacity: 1,
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default CalmFooter;
