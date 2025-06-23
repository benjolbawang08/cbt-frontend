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
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch questions
  const fetchQuestions = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://cbt-backend-livid.vercel.app/api/questions/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setQuestions(response.data.questions || []);
    } catch (error) {
      console.error("Error fetching questions", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch questions.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete question
  const handleDeleteQuestion = async (code) => {
    console.log("Menghapus question dengan code:", code);
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
          `https://cbt-backend-livid.vercel.app/api/questions/${code}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        Swal.fire("Success", "Question deleted successfully.", "success");
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.code !== code)
        );

        // Optionally refetch questions
        fetchQuestions();
      } catch (error) {
        Swal.fire("Error", "Failed to delete question.", "error");
        console.error("Error deleting question", error);
      }
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Question List
        </Typography>

        {isLoading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Code</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Subject</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Question</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Score</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.map((question) => (
                  <TableRow key={question._id}>
                    <TableCell>{question.code}</TableCell>
                    <TableCell>{question.subject}</TableCell>
                    <TableCell>
                      {question.questions[0]?.question || "N/A"}
                    </TableCell>
                    <TableCell>
                      {question.questions.reduce(
                        (total, q) => total + q.score,
                        0
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteQuestion(question.code)}
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

export default QuestionList;
