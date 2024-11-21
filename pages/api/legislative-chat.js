// pages/api/legislative-chat.js
import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { query } = req.body;

    try {
      // Fetch content from Diário da República
      const response = await axios.get('https://diariodarepublica.pt/dr/legislacao-consolidada-destaques');
      const $ = cheerio.load(response.data);

      // Basic content extraction (you'll need to customize this)
      const relevantContent = $('body').text();

      // Simulate AI response (replace with actual AI processing)
      const aiResponse = `Processando: ${query}\n\nConteúdo relevante: ${relevantContent.slice(0, 200)}...`;

      res.status(200).json({ response: aiResponse });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao processar a solicitação' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
