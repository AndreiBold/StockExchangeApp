const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: "http://localhost:3000"}));

require("dotenv").config();
const PORT = process.env.PORT || 5000;

function extractDatasetCodes(inputString) {
    // Remove all "\" characters from the string
    const jsonString = inputString.replace(/\\/g, '');
  
    // Create a regular expression to match "dataset_code" and its value
    const regex = /"dataset_code":\s*"([^"]+)"/g;
  
    const datasetCodes = [];
    let match;
    while ((match = regex.exec(jsonString)) !== null) {
      // Extract the value from the matched group (the part inside the quotes)
      const datasetCodeValue = match[1];
      datasetCodes.push(datasetCodeValue);
    }
  
    return datasetCodes;
  }

app.get("/companies", async (req, res) => {
    try {
      const nasdaqApiUrl =  `https://data.nasdaq.com/api/v3/datasets/?database_code=WIKI&api_key=${process.env.NASDAQ_DATA_LINK_API_KEY}`;
      const response = await axios.get(nasdaqApiUrl);
      const companies = extractDatasetCodes(response.data)

      res.status(200).json(companies);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch companies from Nasdaq API' });
    }
  });

  app.get("/companies/stocks/:name", async (req, res) => {
    try {
      const nasdaqApiUrl = `https://data.nasdaq.com/api/v3/datasets/WIKI/${req.params.name}/data.json?api_key=${process.env.NASDAQ_DATA_LINK_API_KEY}`;
      const response = await axios.get(nasdaqApiUrl);

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch stock data from Nasdaq API' });
    }
  });

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));

