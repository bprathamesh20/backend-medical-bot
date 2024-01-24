import express from 'express';
import multer from 'multer';
import cors from 'cors';
const app = express();
app.use(cors())
const port = 3001;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.post('/upload', upload.single('pdfFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const pdfData = req.file.buffer;
  const extractedData = "PARSED DATA";
  // extractDataFromPdf(pdfData);


  console.log("in upload");
  console.log(pdfData);
  //await extractDataFromPdf(pdfData);
  res.json({ extractedData });
});

app.post('/processData', express.json(), (req, res) => {
  const { extractedData } = req.body;

  // Process the extracted data (perform database queries, etc.)
  console.log('Received extracted data:', extractedData);

  // Send a response to the client
  res.json({ message: 'Data processed successfully' });
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
