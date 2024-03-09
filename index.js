const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); 

let todos = [];

app.get("/todos", (req, res) => {
  res.send(todos);
});

app.post("/todos", (req, res) => {
  const text = req.body.text;
  const newTodo = {
    id: todos.length + 1,
    text,
  };
  todos.push(newTodo);
  res.status(201).send(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));

  if (todoIndex !== -1) {
    todos[todoIndex].text = text;
    res.send(todos[todoIndex]);
  } else {
    res.status(404).send({ message: "Todo not found" });
  }
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  todos = todos.filter((todo) => todo.id !== parseInt(id));
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
