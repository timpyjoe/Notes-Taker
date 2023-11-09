const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4} = require("uuid");

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.static('public'))

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});


app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err){
      console.log(err);
    }
    res.send(JSON.parse(data));
  })
})

app.post('/api/notes', (req, res) => {
  req.body.id = uuidv4();
  fs.readFile('./db/db.json', (err, data) => {
    const notesArray = JSON.parse(data);
    console.log(notesArray);
    const newNote = req.body;
    notesArray.push(newNote);
    console.log(notesArray);
    fs.writeFile('./db/db.json', JSON.stringify(notesArray), (err) => {
      if (err){
        console.log(err)
      }
    });

  
  });
})



app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);