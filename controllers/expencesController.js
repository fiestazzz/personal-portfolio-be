const express = require('express');
const Todo = require('../models/expenceModel')
const {getExpences, getExpenceById, createExpence, updateExpence, deleteExpence} = require('../businessServices/expenceTrackerBusinessService')

const router = express.Router();


// get all expences
router.get('/', getExpences);

// get expence by id
router.get('/:id', getExpenceById);

// create an expence
router.post('/', createExpence);

// update an expence
router.put('/:id', updateExpence);

// delete an expence
router.delete('/:id', deleteExpence);


module.exports = router;