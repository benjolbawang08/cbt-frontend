import React, { useState } from "react";
import { Container, TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://cbt-backend-livid.vercel.app/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("user_id", response.data.user_id);
      response.data.role === "admin"
        ? navigate("/admin-dashboard")
        : navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "Login failed!",
        text:
          error.response.data.message ||
          "An error occurred during registration.",
      });
    }
  };

  const handleRegister = () => {
    Swal.fire({
      title: "Apakah kamu sudah mendaftar?",
      showCancelButton: true,
      confirmButtonText: "Sudah",
      cancelButtonText: "Belum",
    }).then((result) => {
      if (!result.isConfirmed) {
        navigate("/register");
      }
    });
  };

  return (
    <Container maxWidth="sm" style={{ minHeight: "100vh" }}>
      <Typography variant="h4" marginTop={"20px"} component="h1" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Typography variant="body1" marginTop={"20px"}>
        Don't have an account?{" "}
        <Link href="#" onClick={handleRegister}>
          Register
        </Link>
      </Typography>
    </Container>
  );
};

export default Login;
