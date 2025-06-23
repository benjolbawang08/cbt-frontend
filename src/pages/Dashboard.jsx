import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Avatar,
  Card,
  CardContent,
  ThemeProvider,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Book, BarChart2, Calendar, Play, Download, Eye } from "lucide-react";
import Swal from "sweetalert2";

// Custom Styled Components
const GradientBackground = styled(Box)(({ theme }) => ({
  background:
    "linear-gradient(135deg,rgb(17, 184, 203) 0%,rgb(37, 137, 252) 100%)",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  borderRadius: 32,
  color: "white",
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: "rgba(104, 118, 118, 0.2)",
  backdropFilter: "blur(10px)",
  borderRadius: 16,
  border: "1px solid rgba(255, 255, 255, 0.125)",
  padding: theme.spacing(4),
  maxWidth: 900,
  width: "100%",
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(5px)",
  borderRadius: 16,
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
  height: "100%",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Peserta";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/kisi-kisi.pdf";
    link.download = "kisi-kisi.pdf";
    link.click();
  };

  const mulaiUjian = () => {
    Swal.fire({
      title: "Persiapan Ujian",
      html: `
        <div style="color: #333; font-size: 16px;">
          <p>Ujian hanya dapat dikerjakan 1 kali.</p>
          <p>Nilai pertama akan disimpan.</p>
          <strong>Fokuslah saat mengerjakannya!</strong>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Mulai Ujian",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/access-token");
      }
    });
  };

  const features = [
    // {
    //   icon: <Book size={40} color="white" />,
    //   title: "Mata Pelajaran",
    //   description: "Pelajari kisi-kisi ujian",
    //   action: "Unduh",
    //   onClick: handleDownload,
    // },
    {
      icon: <BarChart2 size={40} color="white" />,
      title: "Riwayat Nilai",
      description: "Pantau perkembangan nilai",
      action: "Lihat",
      onClick: () => navigate("/result"),
    },
    {
      icon: <Calendar size={40} color="white" />,
      title: "Jadwal Ujian",
      description: "Lihat jadwal mendatang",
      action: "Lihat",
      onClick: () => navigate("/schedule"),
    },
  ];

  return (
    <GradientBackground>
      <Container maxWidth="lg">
        <GlassCard>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* User Profile Section */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "secondary.main",
                  mx: "auto",
                  mb: 2,
                  fontSize: "2.5rem",
                }}
              >
                {username[0].toUpperCase()}
              </Avatar>
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  mb: 1,
                }}
              >
                Selamat Datang, {username}!
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  maxWidth: 500,
                  mx: "auto",
                }}
              >
                Siap untuk memulai ujian hari ini? Pilih menu di bawah untuk
                melanjutkan.
              </Typography>
            </Box>

            <Divider
              sx={{
                backgroundColor: "rgba(255,255,255,0.3)",
                mb: 4,
              }}
            />

            {/* Features Grid */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <FeatureCard elevation={0}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Box sx={{ mr: 2 }}>{feature.icon}</Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "white",
                            mb: 0.5,
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </Box>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          onClick={feature.onClick}
                          sx={{
                            color: "white",
                            borderColor: "white",
                            "&:hover": {
                              backgroundColor: "rgba(255,255,255,0.2)",
                            },
                          }}
                        >
                          {feature.action}
                        </Button>
                      </motion.div>
                    </Box>
                  </FeatureCard>
                </Grid>
              ))}
            </Grid>

            {/* Start Exam Button */}
            <Box sx={{ textAlign: "center" }}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<Play />}
                  onClick={mulaiUjian}
                  sx={{
                    borderRadius: 8,
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Mulai Ujian
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </GlassCard>
      </Container>
    </GradientBackground>
  );
};

export default Dashboard;
