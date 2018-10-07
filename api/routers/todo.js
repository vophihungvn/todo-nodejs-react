const { Router } = require('express');
const router = Router();
const Todo = require('../models/todo');

router.get('/', async (req, res) => {
  const todos = await Todo.find();

  res.json({
    data: todos
  });
});

router.post('/', async (req, res) => {
  const { title } = req.body;
  const todo = new Todo({ title });
  await todo.save();
  res.json({
    data: todo
  });
});

module.exports = router;
