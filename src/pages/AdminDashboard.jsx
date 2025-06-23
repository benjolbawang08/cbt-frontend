import React from "react";
import { Box, Container, Grid } from "@mui/material";

import Header from "../components/AdminHeader";
import UserManagement from "../components/UserManagement";
import AddQuestion from "../components/AddQuestions";
import QuestionList from "../components/QuestionList";

const AdminDashboard = () => {
  return (
    <div>
      <Header />
      <Container style={{ marginTop: "20px" }}>
        <Grid container spacing={3}>
          {/* User Management Section */}
          <Grid item xs={12} md={6}>
            <UserManagement />
          </Grid>

          {/* Add Question Section */}
          <Grid item xs={12} md={6}>
            <AddQuestion />
          </Grid>

          {/* Question List Section */}
          <Grid item xs={12}>
            <QuestionList />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AdminDashboard;
