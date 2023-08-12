const Expence = require('../models/expenceModel')
const asyncHandler = require('express-async-handler')

// get all product
const getExpences = asyncHandler(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    try {
        const totalCount = await Expence.countDocuments();
        const totalPages = Math.ceil(totalCount / pageSize);

        const expences = await Expence.find().skip((page - 1) * pageSize)
        .limit(pageSize);
        res.status(200).json({
            totalCount:totalCount,
            currentPage: page,
            pageSize: pageSize,
            totalPages: totalPages,
            expences: expences,
          });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// get a single product
const getExpenceById = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const expence = await Expence.findById(id);
        res.status(200).json(expence);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// create a product
const createExpence = asyncHandler(async(req, res) => {
    try {
        const expence = await Expence.create(req.body)
        res.status(200).json(expence);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// update a product
const updateExpence = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const expence = await Expence.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!expence){
            res.status(404);
            throw new Error(`cannot find any expence with ID ${id}`);
        }
        const updatedExpence = await Expence.findById(id);
        res.status(200).json(updatedExpence);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const deleteExpence = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const expence = await Expence.findByIdAndDelete(id);
        if(!todo){
            res.status(404);
            throw new Error(`cannot find any expence with ID ${id}`);
        }
        res.status(200).json(expence);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})





module.exports = {
    getExpences,
    getExpenceById,
    createExpence,
    updateExpence,
    deleteExpence
}