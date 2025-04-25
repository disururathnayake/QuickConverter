const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const { PDFDocument } = require("pdf-lib");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors({
  origin: ["http://localhost:3000", "https://quick-converter-five.vercel.app"]
}));

const upload = multer({ dest: "uploads/" });

// OAuth2 Client Setup
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

// You must already have a refresh token from OAuth consent flow
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const drive = google.drive({ version: "v3", auth: oauth2Client });

app.post("/pdf-to-word", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  const fileName = req.file.originalname;

  try {
    // Upload PDF to Google Drive
    const driveResponse = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: "application/vnd.google-apps.document",
      },
      media: {
        mimeType: "application/pdf",
        body: fs.createReadStream(filePath),
      },
    });


    const fileId = driveResponse.data.id;

    // Export to DOCX format
    const exportResponse = await drive.files.export(
      {
        fileId,
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
      { responseType: "stream" }
    );

    const outputPath = path.join(__dirname, "uploads", `converted-${Date.now()}.docx`);
    const dest = fs.createWriteStream(outputPath);

    exportResponse.data.pipe(dest);
    exportResponse.data.on("end", () => {
      res.download(outputPath, "converted.docx", () => {
        fs.unlinkSync(filePath);
        fs.unlinkSync(outputPath);

        // Optional: clean up from Google Drive
        drive.files.delete({ fileId });
      });
    });

  } catch (err) {
    console.error("Error during conversion:", err.message);
    fs.unlinkSync(filePath);
    res.status(500).send("Conversion failed");
  }
});

app.post("/word-to-pdf", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  const fileName = req.file.originalname;

  try {
    // Upload DOC/DOCX as Google Doc
    const driveResponse = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: "application/vnd.google-apps.document", // convert to Google Doc
      },
      media: {
        mimeType: req.file.mimetype,
        body: fs.createReadStream(filePath),
      },
    });

    const fileId = driveResponse.data.id;

    // Export to PDF format
    const exportResponse = await drive.files.export(
      {
        fileId,
        mimeType: "application/pdf",
      },
      { responseType: "stream" }
    );

    const outputPath = path.join(__dirname, "uploads", `converted-${Date.now()}.pdf`);
    const dest = fs.createWriteStream(outputPath);

    exportResponse.data.pipe(dest);
    exportResponse.data.on("end", () => {
      res.download(outputPath, "converted.pdf", () => {
        fs.unlinkSync(filePath);
        fs.unlinkSync(outputPath);

        // Optional: remove from Drive
        drive.files.delete({ fileId });
      });
    });

  } catch (err) {
    console.error("Error during Word → PDF conversion:", err.message);
    fs.unlinkSync(filePath);
    res.status(500).send("Conversion failed");
  }
});

app.post("/merge-pdf", upload.array("files", 10), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length < 2) {
      return res.status(400).send("At least 2 PDF files are required to merge.");
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const pdfBytes = fs.readFileSync(file.path);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach(page => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();
    const outputPath = path.join(__dirname, "uploads", `merged-${Date.now()}.pdf`);

    fs.writeFileSync(outputPath, mergedBytes);

    res.download(outputPath, "merged.pdf", () => {
      files.forEach(f => fs.unlinkSync(f.path));
      fs.unlinkSync(outputPath);
    });

  } catch (err) {
    console.error("Merge error:", err);
    res.status(500).send("Failed to merge PDF files.");
  }
});

app.post("/split-pdf", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  const pageInput = req.body.pages;

  try {
    const pdfBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const newPdf = await PDFDocument.create();

    const totalPages = pdfDoc.getPageCount();
    const pagesToExtract = parsePageInput(pageInput, totalPages);

    if (!pagesToExtract.length) {
      fs.unlinkSync(filePath);
      return res.status(400).send("Invalid page selection.");
    }

    for (const pageNum of pagesToExtract) {
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNum - 1]);
      newPdf.addPage(copiedPage);
    }

    const splitPdfBytes = await newPdf.save();
    const outputPath = path.join(__dirname, "uploads", `split-${Date.now()}.pdf`);
    fs.writeFileSync(outputPath, splitPdfBytes);

    res.download(outputPath, "split.pdf", () => {
      fs.unlinkSync(filePath);
      fs.unlinkSync(outputPath);
    });
  } catch (err) {
    console.error("Split PDF error:", err.message);
    fs.unlinkSync(filePath);
    res.status(500).send("Failed to split PDF.");
  }
});

// Utility function to parse "1,3,5-7"
function parsePageInput(input, maxPage) {
  const ranges = input.split(",");
  const pages = new Set();

  for (const part of ranges) {
    if (part.includes("-")) {
      const [start, end] = part.split("-").map(Number);
      for (let i = start; i <= end && i <= maxPage; i++) {
        if (i > 0) pages.add(i);
      }
    } else {
      const page = Number(part);
      if (page > 0 && page <= maxPage) pages.add(page);
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
