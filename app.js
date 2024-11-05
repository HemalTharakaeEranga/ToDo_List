const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

let todos = [];

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
});

app.post('/todos', (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    if (title.length < 3) {
        return res.status(400).json({ message: 'Title must be at least 3 characters long' });
    }

    const id = Date.now().toString(); 
    const newTodo = {
        id,
        title,
        description,
        status: "pending" 
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
});


app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    const { title, description, status } = req.body;
    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    todo.title = title !== undefined ? title : todo.title;
    todo.description = description !== undefined ? description : todo.description;
    todo.status = status !== undefined ? status : todo.status;

    res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex(todo => todo.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    const deletedTodo = todos.splice(index, 1);

    res.json(deletedTodo[0]);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});