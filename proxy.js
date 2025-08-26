// Minimal CORS proxy for BMW Features Comparator
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing url');
  try {
    const response = await fetch(url);
    const text = await response.text();
    res.send(text);
  } catch (e) {
    console.error(`Proxy fetch failed for URL: ${url}\nError:`, e);
    res.status(500).send('Fetch failed');
  }
});

app.listen(8080, () => console.log('Proxy running on http://localhost:8080/proxy?url=...')); 