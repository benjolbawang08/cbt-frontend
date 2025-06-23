import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

const AddQuestion = () => {
  const [subject, setSubject] = useState("Informatika");
  const [code, setCode] = useState("INF101");
  const [questions, setQuestions] = useState([
    {
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctOption: "",
      score: 1, // Default value for score
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const addQuestionField = () => {
    const isQuestionValid = (q) => {
      return (
        q.question &&
        q.optionA &&
        q.optionB &&
        q.optionC &&
        q.optionD &&
        q.correctOption &&
        q.score
      );
    };

    if (!isQuestionValid(questions[questions.length - 1])) {
      setSnackbar({
        open: true,
        message:
          "Please complete the current question before adding a new one.",
        severity: "warning",
      });
      return;
    }

    setQuestions([
      ...questions,
      {
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctOption: "",
        score: 1,
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      setSnackbar({
        open: true,
        message: "No authentication token found. Please log in.",
        severity: "error",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://cbt-backend-livid.vercel.app/api/questions/create",
        { subject, code, questions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSnackbar({
        open: true,
        message: "Questions added successfully!",
        severity: "success",
      });
      setQuestions([
        {
          question: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctOption: "",
          score: 1,
        },
      ]);
    } catch (error) {
      console.error("Error adding questions:", error.response?.data || error);
      setSnackbar({
        open: true,
        message: "Failed to add questions. Please try again.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add Questions
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Course Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </Box>

          {questions.map((q, index) => (
            <Box
              key={index}
              sx={{ mb: 3, p: 2, border: "1px solid #ddd", borderRadius: 2 }}
            >
              <Typography variant="h6">Question {index + 1}</Typography>
              <TextField
                fullWidth
                label="Question"
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(index, "question", e.target.value)
                }
                sx={{ mb: 2 }}
                required
              />
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2,
                  mb: 2,
                }}
              >
                <TextField
                  label="Option A"
                  value={q.optionA}
                  onChange={(e) =>
                    handleQuestionChange(index, "optionA", e.target.value)
                  }
                  required
                />
                <TextField
                  label="Option B"
                  value={q.optionB}
                  onChange={(e) =>
                    handleQuestionChange(index, "optionB", e.target.value)
                  }
                  required
                />
                <TextField
                  label="Option C"
                  value={q.optionC}
                  onChange={(e) =>
                    handleQuestionChange(index, "optionC", e.target.value)
                  }
                  required
                />
                <TextField
                  label="Option D"
                  value={q.optionD}
                  onChange={(e) =>
                    handleQuestionChange(index, "optionD", e.target.value)
                  }
                  required
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Correct Option</InputLabel>
                  <Select
                    value={q.correctOption}
                    label="Correct Option"
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        "correctOption",
                        e.target.value
                      )
                    }
                    required
                  >
                    <MenuItem value="A">Option A</MenuItem>
                    <MenuItem value="B">Option B</MenuItem>
                    <MenuItem value="C">Option C</MenuItem>
                    <MenuItem value="D">Option D</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  type="number"
                  label="Score"
                  value={q.score}
                  onChange={(e) =>
                    handleQuestionChange(index, "score", Number(e.target.value))
                  }
                  InputProps={{ inputProps: { min: 1 } }}
                  required
                />
              </Box>
            </Box>
          ))}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={addQuestionField}
            >
              Add Another Question
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Submit Questions"}
            </Button>
          </Box>
        </form>
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

export default AddQuestion;
