const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const port = 3000;

const url = "https://rickandmortyapi.com/api/character/";

app.use(cors());

app.get('/character/', async (req, res) => {
    try {
        const response = await axios.get(url);
        const data = response.data; 
        res.json(data.results); 
    } catch (error) {
        res.status(404).json({ error: `Personaje no encontrado` }); 
    }
});


app.get('/character/:name', async (req, res) => {
    const characterName = req.params.name;
    const characterUrl = `https://rickandmortyapi.com/api/character/?name=${characterName}`;
    try {
        const response = await axios.get(characterUrl);
        const [firstCharacter] = response.data.results; 
        if (firstCharacter) { 
            const { name, status, species, gender, origin: {name: originName}, image } = firstCharacter;
            res.json({ name, status, species, origin: {name: originName}, gender, image });
        } else {
            res.status(404).json({ error: `Personaje "${characterName}" no encontrado` });
        }
    } catch (error) {
        res.status(404).json({ error: `Error al buscar el personaje "${characterName}"` });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
