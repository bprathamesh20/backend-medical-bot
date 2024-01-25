// usage: node pdf-parser-express
// the below packages are required to run this server, and can be installed with npm

import express from 'express';
import bodyParser from 'body-parser';
import pdf from 'pdf-parse';
import multer from 'multer';
import cors from 'cors';
import FetchResponse from './helpers/FetchDaignosis.js';
import FetchMessage from './helpers/FetchMessage.js';

//var upload = multer({ dest: 'uploads/' });
const upload = multer();


const app = express();
const port = 3000;
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.raw());



app.post('/multipart-parse', upload.single('file'), (req, res) => {

  const buff = req.file.buffer;

  pdf(buff).then((data) => {
    // PDF text
    console.log(data.text);
    res.send({ extractedData: data.text });
  });
});

app.post('/process-data', express.json(), async (req, res) => {
    const { extractedData } = req.body;
    
    const response = await FetchResponse(extractedData)
    // Process the extracted data (perform database queries, etc.)
    console.log('Received extracted data:', extractedData);
    console.log(response)
    // Send a response to the client
    res.json({ message: response });
});

app.post('/get-response', express.json(), async(req, res)=>{
  const { messages } = req.body;
    console.log(messages)
    const response = await FetchMessage(messages)
    // Process the extracted data (perform database queries, etc.)
    console.log('Received extracted data:', response);
  
    // Send a response to the client
    res.json({ message: response });

})
  


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
