import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch all users
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://cbt-backend-livid.vercel.app/api/users/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch users.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new user
  const handleAddUser = async () => {
    const token = localStorage.getItem("token");

    if (!newUser.username || !newUser.email || !newUser.password) {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }

    try {
      const response = await axios.post(
        "https://cbt-backend-livid.vercel.app/api/auth/register",
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire("Success", "User added successfully", "success");
      console.log("New user response:", response.data);
      setNewUser({ username: "", email: "", password: "" });
      fetchUsers();
    } catch (error) {
      console.error(
        "Error adding user:",
        error.response?.data || error.message
      );
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to add user",
        "error"
      );
    }
  };

  // Delete a user
  const handleDeleteUser = async (id) => {
    const token = localStorage.getItem("token");

    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://cbt-backend-livid.vercel.app/api/users/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        Swal.fire("Success", "User deleted successfully", "success");
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } catch (error) {
        console.error(
          "Error deleting user:",
          error.response?.data || error.message
        );
        Swal.fire("Error", "Failed to delete user", "error");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} display="flex" alignItems="center">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleAddUser}
              >
                Add User
              </Button>
            </Grid>
          </Grid>
        </Box>

        {isLoading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Username</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserManagement;
