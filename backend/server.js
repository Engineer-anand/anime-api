const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

// Enable CORS for all origins
app.use(cors());

// Proxy endpoint
app.get('/api/*', async (req, res) => {
  const apiUrl = `https://api-anime-rouge.vercel.app${req.originalUrl.replace('/api', '')}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from API:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from the external API' });
  }
});

// Root endpoint for testing
app.get('/', (req, res) => {
  res.send('CORS proxy server is running.');
});

// Start server on port 4000
const PORT = process.env.PORT||4000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
