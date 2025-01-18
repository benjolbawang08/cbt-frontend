import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // import useParams
import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress,
  FormControl,
  Paper,
  Box,
  Container,
  LinearProgress,
  Card,
  CardContent,
  useTheme,
  createTheme,
  ThemeProvider,
  Alert,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f4f4f4",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
}));

const StyledRadio = styled(Radio)(({ theme }) => ({
  "&.Mui-checked": {
    color: theme.palette.primary.main,
  },
}));

const Test = () => {
  const { code } = useParams(); // Capture code from URL
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem("token");
      const code = localStorage.getItem("code"); // Get the code from localStorage
      try {
        const response = await axios.get(
          `https://jokicbt7.vercel.app/api/questions/${code}`, // Use the code in the URL
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.setItem("examId", response.data.examId); // Save the exam ID to localStorage
        console.log("data: ", response.data);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Gagal memuat soal. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [code]); // Re-fetch when the code changes

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleExit = () => {
    Swal.fire({
      title: "Konfirmasi Keluar",
      text: "Apakah Anda yakin ingin keluar dari tes? Jawaban Anda belum tersimpan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6A8CAF", // Soft blue-gray
      cancelButtonColor: "#8E97A6", // Muted gray-blue
      confirmButtonText: "Ya, Keluar",
      cancelButtonText: "Batalkan",
      background: "#f6f9fc", // Soft light background
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        content: "custom-swal-content",
        confirmButton: "custom-swal-confirm-btn",
        cancelButton: "custom-swal-cancel-btn",
      },
      width: "380px",
      padding: "20px",
      borderRadius: "12px",
      backdrop: "rgba(0,0,0,0.1)", // Soft backdrop
      showClass: {
        popup: "animate__animated animate__fadeInUp animate__faster",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutDown animate__faster",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Keluar Tes",
          text: "Anda akan diarahkan ke dashboard.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          background: "#f6f9fc",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            content: "custom-swal-content",
          },
        }).then(() => {
          navigate("/dashboard");
        });
      }
    });
  };

  // Fungsi validasi tambahan
  const validateAnswers = () => {
    // Pastikan semua pertanyaan terjawab
    const unansweredQuestions = questions.filter(
      (question) => !answers[question._id]
    );

    if (unansweredQuestions.length > 0) {
      setError(
        `Harap jawab semua pertanyaan. ${unansweredQuestions.length} soal belum terjawab.`
      );
      return false;
    }

    // Validasi jawaban
    const invalidAnswers = questions.filter(
      (question) =>
        answers[question._id] &&
        !["A", "B", "C", "D"].includes(answers[question._id])
    );

    if (invalidAnswers.length > 0) {
      setError("Terdapat jawaban tidak valid");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    const examId = localStorage.getItem("examId");

    // Validasi terlebih dahulu
    if (!validateAnswers()) {
      return;
    }

    // Validasi data sebelum submit
    if (!examId || !userId) {
      setError("Data ujian atau pengguna tidak valid");
      return;
    }

    // Transformasi answers sesuai struktur payload yang diinginkan
    const answersPayload = questions.map((question) => ({
      questionId: question._id,
      userAnswer: answers[question._id],
    }));

    const payload = {
      exam: examId, // Perhatikan perubahan key dari examId ke exam
      userId: userId,
      answers: answersPayload,
    };

    console.log("Payload yang akan dikirim:", JSON.stringify(payload, null, 2));

    try {
      setSubmitting(true);

      const response = await axios.post(
        "https://jokicbt7.vercel.app/api/results/submit-answer",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Log FULL response untuk melihat struktur sebenarnya
      console.log("Full Response:", response);
      console.log("Response Data:", response.data);

      // Perbaiki pengecekan response
      if (response.data) {
        // Sesuaikan dengan struktur aktual response dari backend
        // Misalnya, jika backend mengembalikan objek dengan properti berbeda
        const score =
          response.data.score ||
          response.data.totalScore ||
          response.data.result ||
          null;

        if (score !== null) {
          navigate("/result", { state: { score: score } });
        } else {
          // Jika tidak menemukan skor, log detail response
          console.error(
            "Tidak dapat menemukan skor dalam response:",
            response.data
          );
          setError("Gagal mengambil skor. Silakan hubungi administrator.");
        }
      } else {
        throw new Error("Tidak ada data dalam response");
      }
    } catch (error) {
      // Logging error yang lebih komprehensif
      console.error("Full Error Object:", error);
      console.error("Error Response Data:", error.response?.data);
      console.error("Error Message:", error.message);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Gagal mengirim jawaban. Silakan coba lagi.";

      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={80} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressValue = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <IconButton
            color="error"
            onClick={handleExit}
            sx={{
              backgroundColor: "rgba(255,0,0,0.1)",
              "&:hover": {
                backgroundColor: "rgba(255,0,0,0.2)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <StyledPaper elevation={3}>
          <Box sx={{ mb: 3 }}>
            <LinearProgress
              variant="determinate"
              value={progressValue}
              color="primary"
            />
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ mt: 1, textAlign: "center", display: "block" }}
            >
              {`Soal ${currentQuestionIndex + 1} dari ${questions.length}`}
            </Typography>
          </Box>

          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {`${currentQuestionIndex + 1}. ${currentQuestion.question}`}
              </Typography>
            </CardContent>
          </Card>

          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              value={answers[currentQuestion._id] || ""}
              onChange={(e) =>
                handleAnswerChange(currentQuestion._id, e.target.value)
              }
            >
              {["A", "B", "C", "D"].map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<StyledRadio />}
                  label={currentQuestion[`option${option}`]}
                  sx={{
                    backgroundColor:
                      answers[currentQuestion._id] === option
                        ? "rgba(63, 81, 181, 0.1)"
                        : "transparent",
                    borderRadius: 2,
                    mb: 1,
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "rgba(63, 81, 181, 0.05)",
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
            }}
          >
            <Button
              startIcon={<ArrowBackIosIcon />}
              variant="outlined"
              color="primary"
              onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              disabled={currentQuestionIndex === 0}
            >
              Sebelumnya
            </Button>

            {currentQuestionIndex < questions.length - 1 ? (
              <Button
                endIcon={<ArrowForwardIosIcon />}
                variant="contained"
                color="primary"
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                disabled={!answers[currentQuestion._id]}
              >
                Selanjutnya
              </Button>
            ) : (
              <Button
                startIcon={<CheckCircleOutlineIcon />}
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                disabled={submitting || !answers[currentQuestion._id]}
              >
                {submitting ? "Mengirim..." : "Selesai"}
              </Button>
            )}
          </Box>
        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
};

export default Test;
