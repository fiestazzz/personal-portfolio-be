const express = require('express');
const Todo = require('../models/todoModel')
const {getTodos, getTodo, createTodo, updateTodo, deleteTodo} = require('../businessServices/todoBusinessService')

const router = express.Router();


// get all todos
router.get('/', getTodos);

// get todo by id
router.get('/:id', getTodo);

// create a todo
router.post('/', createTodo);

// update a todo
router.put('/:id', updateTodo);

// delete a todo
router.delete('/:id', deleteTodo);








module.exports = router;