const express = require("express");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "Estudiar para el examen de Redes",
    date: "2024-11-14",
    important: true,
  },
  {
    id: 2,
    content: "Comprar insumos para el proyecto de Sistemas Operativos",
    date: "2024-11-15",
    important: false,
  },
  {
    id: 3,
    content: "Terminar tarea de derivadas en XSLT",
    date: "2024-11-16",
    important: true,
  },
  {
    id: 4,
    content: "Revisar documentación del kernel Linux",
    date: "2024-11-17",
    important: false,
  },
  {
    id: 5,
    content: "Practicar conceptos de Kubernetes para entrevista",
    date: "2024-11-18",
    important: true,
  },
];

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find(note => note.id === id);

    if (note) {
        response.json(note);
    } else {
        response.status(404).end();
    }
    
  });

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id);
    response.status(204).end();
});

app.post('/api/notes', (request, response) => {
  const note = request.body;

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note content is missing'
    })
  }
  
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote]

  response.status(201).json(newNote);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});