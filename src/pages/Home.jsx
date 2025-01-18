import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  ThemeProvider,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import ComputerIcon from "@mui/icons-material/Computer";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { Sparkles, TrendingUp, Zap } from "lucide-react";

// Custom Styled Components
const GradientBackground = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #cb8411 0%, #25eefc 100%)",
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
  maxWidth: 800,
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
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
}));

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <SchoolIcon sx={{ fontSize: 50, color: "white" }} />,
      title: "Ujian Online",
      description: "Fleksibel dan bebas lokasi",
      color: "primary",
    },
    {
      icon: <ComputerIcon sx={{ fontSize: 50, color: "white" }} />,
      title: "Akses Mudah",
      description: "Antarmuka modern dan intuitif",
      color: "secondary",
    },
    {
      icon: <AssessmentIcon sx={{ fontSize: 50, color: "white" }} />,
      title: "Hasil Instan",
      description: "Dapatkan skor langsung",
      color: "info",
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
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "white",
                mb: 3,
              }}
            >
              CBT Smart Learning
            </Typography>

            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                color: "rgba(255,255,255,0.8)",
                mb: 4,
              }}
            >
              Ujian online cerdas untuk generasi masa depan
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <FeatureCard elevation={0}>
                    <CardContent>
                      {feature.icon}
                      <Typography
                        variant="h6"
                        sx={{
                          mt: 2,
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </FeatureCard>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<Zap />}
                  onClick={() => navigate("/login")}
                  sx={{
                    borderRadius: 8,
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Mulai Sekarang
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </GlassCard>
      </Container>
    </GradientBackground>
  );
};

export default Home;
