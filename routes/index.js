import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

// Роут для получения случайной цитаты и отображения ее в Pug-шаблоне
router.get('/api/quote', async (req, res) => {
  try {
    const response = await fetch('https://zenquotes.io/api/random');

    if (!response.ok) {
      console.error('Error response from Zen Quotes API:', response.status, response.statusText);
      return res.status(response.status).send(`Failed to fetch quote: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const quote = data[0];

    res.render('quote', {
      author: quote.a,
      content: quote.q
    });

  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;