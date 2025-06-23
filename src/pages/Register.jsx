import React, { useState } from "react";
import { Container, TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post(
        "https://cbt-backend-livid.vercel.app/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      Swal.fire({
        icon: "success",
        title: "Registration successful!",
        text: "You have successfully registered.",
      });
    } catch (error) {
      console.error("Registration failed:", error);
      Swal.fire({
        icon: "error",
        title: "Registration failed!",
        text: error.response || "An error occurred during registration.",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  const handleLogin = () => {
    Swal.fire({
      title: "Sudah memiliki akun?",
      showCancelButton: true,
      confirmButtonText: "Sudah",
      cancelButtonText: "Belum",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };

  return (
    <Container maxWidth="sm" style={{ minHeight: "100vh" }}>
      <Typography variant="h4" marginTop={"20px"} component="h1" gutterBottom>
        Register
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
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
      <Button variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>
      <Typography variant="body1" marginTop={"20px"}>
        Already have an account?{" "}
        <Link href="#" onClick={handleLogin}>
          Login
        </Link>
      </Typography>
    </Container>
  );
};

export default Register;
