//required 
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

//port with heroku env  
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//GET routes 
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/api/notes', (req, res) => {
    //read file add to get post line 23
    let notes = JSON.parse(fs.readFileSync('./db/db.json'))
    res.json(notes);
});

//POST to push db.json file to body and show it as a string
app.post('/api/notes', (req, res) => {
    let notes = JSON.parse(fs.readFileSync('./db/db.json'))
    req.body.id = notes.length + 1
    notes.push(req.body)
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//GET route for all other ppages to produce 404
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/404.html'))
);

//LISTEN to port
app.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}`)
);
