const express = require('express');
const{sendMail} = require('../businessServices/mailerBusinessService');

const router = express.Router();

// send mail
router.post('/', sendMail);


module.exports = router;