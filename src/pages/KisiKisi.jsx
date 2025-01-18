import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { Button, Box, Container, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import kisikisiPDF from "/kisi-kisi.pdf"; // Path relatif ke folder `public`

const PDFReader = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = kisikisiPDF; // Gunakan URL yang benar
    link.download = "kisi-kisi.pdf";
    link.click();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box textAlign="center" my={4}>
          <Typography variant="h5" gutterBottom>
            PDF Reader
          </Typography>
          <Typography variant="body2" gutterBottom>
            Use the navigation buttons to view the document.
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center" my={3}>
          <Document
            file={kisikisiPDF}
            onLoadSuccess={onDocumentLoadSuccess}
            loading="Loading document..."
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </Box>

        <Box textAlign="center" my={2}>
          <Typography>
            Page {pageNumber} of {numPages || "--"}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center" gap={2} mb={3}>
          <Button
            variant="contained"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </Button>
        </Box>

        <Box textAlign="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDownload}
          >
            Download PDF
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PDFReader;
