const Todo = require('../models/todoModel')
const asyncHandler = require('express-async-handler')

// get all product
const getTodos = asyncHandler(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    try {
        const totalCount = await Todo.countDocuments();
        const totalPages = Math.ceil(totalCount / pageSize);
        const todos = await Todo.find().skip((page - 1) * pageSize)
        .limit(pageSize);
        res.status(200).json({
            totalCount:totalCount,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            data: todos,
          });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// get a single product
const getTodo = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const todo = await Todo.findById(id);
        res.status(200).json(todo);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// create a product
const createTodo = asyncHandler(async(req, res) => {
    try {
        const todo = await Todo.create(req.body)
        res.status(200).json(todo);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// update a product
const updateTodo = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const todo = await Todo.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            res.status(404);
            throw new Error(`cannot find any product with ID ${id}`);
        }
        const updatedTodo = await Todo.findById(id);
        res.status(200).json(updateTodo);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const deleteTodo = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if(!todo){
            res.status(404);
            throw new Error(`cannot find any product with ID ${id}`);
        }
        res.status(200).json(todo);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})





module.exports = {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
}