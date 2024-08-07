import express from 'express';
import * as db from './database.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("frontend"));

app.get('/artists', async (req, res) => {
    const genre = req.query.genre;
    if (!genre) return res.status(400).send('Genre is required');
    
    try {
        const artists = await db.getArtistsByGenre(genre);
        res.setHeader('Content-Type', 'application/json');
        res.json(artists);
        res.status(200)
        console.log(artists);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});