export default function handler(req, res) {
    if (req.method === 'POST') {
        const { query } = req.body;
        res.status(200).json({ response: `Você perguntou: "${query}". Aqui está sua resposta.` });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
