import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Grid,
  Avatar,
  Button,
  styled,
} from "@mui/material";
import { motion } from "framer-motion";
import { User, Mail, Award, Edit, AlertTriangle } from "lucide-react";
import axios from "axios";

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

const GlassCard = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  borderRadius: 16,
  border: "1px solid rgba(255, 255, 255, 0.125)",
  padding: theme.spacing(4),
  maxWidth: 800,
  width: "100%",
}));

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");

      if (!token) {
        setError("Token tidak ditemukan. Silakan login kembali.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data.user);
      } catch (err) {
        setError(err.response?.data?.message || "Terjadi kesalahan.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Loading State
  if (loading) {
    return (
      <GradientBackground>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CircularProgress size={60} color="secondary" />
        </motion.div>
      </GradientBackground>
    );
  }

  // Error State
  if (error) {
    return (
      <GradientBackground>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Alert
            icon={<AlertTriangle color="red" />}
            severity="error"
            sx={{
              background: "rgba(255,255,255,0.2)",
              color: "white",
              borderRadius: 2,
            }}
          >
            {error}
          </Alert>
        </motion.div>
      </GradientBackground>
    );
  }

  // Profile Details
  return (
    <GradientBackground>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GlassCard>
            <Grid container spacing={4} alignItems="center">
              {/* Profile Avatar */}
              <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Avatar
                    sx={{
                      width: 150,
                      height: 150,
                      margin: "0 auto",
                      bgcolor: "secondary.main",
                      fontSize: "4rem",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    }}
                  >
                    {profile.username}
                  </Avatar>
                </motion.div>
              </Grid>

              {/* Profile Details */}
              <Grid item xs={12} md={8}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    mb: 3,
                  }}
                >
                  Profil Pengguna
                </Typography>

                {/* Profile Info Items */}
                {[
                  {
                    icon: <User size={24} color="white" />,
                    label: "Username",
                    value: profile.username,
                  },
                  {
                    icon: <Mail size={24} color="white" />,
                    label: "Email",
                    value: profile.email,
                  },
                  {
                    icon: <Award size={24} color="white" />,
                    label: "Role",
                    value: profile.role,
                  },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: 2,
                      p: 1.5,
                    }}
                  >
                    <Box sx={{ mr: 2 }}>{item.icon}</Box>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "rgba(255,255,255,0.7)",
                          mb: 0.5,
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Typography variant="body1" sx={{ color: "white" }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Box>
                ))}

                {/* Edit Profile Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Edit />}
                    sx={{
                      mt: 2,
                      borderRadius: 8,
                      px: 3,
                      py: 1.5,
                    }}
                  >
                    Edit Profil
                  </Button>
                </motion.div>
              </Grid>
            </Grid>
          </GlassCard>
        </motion.div>
      </Container>
    </GradientBackground>
  );
};

export default Profile;
