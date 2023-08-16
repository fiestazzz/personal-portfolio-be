const mailer = require('nodemailer');
const asyncHandler = require('express-async-handler')
require('dotenv').config()


const mail_user = process.env.MAIL_USER;
const mail_password = process.env.MAIL_PASSWORD;
const mail_receiver = process.env.MAIL_RECEIVER;
const subject = process.env.CONTACT_ME_MAIL_SUBJECT;

const helloText = process.env.CONTACT_ME_MAIL_CONTENT_HELLO;
const mailContent = process.env.CONTACT_ME_MAIL_CONTENT;


//creating the mail transporter
const mailTransporter = mailer.createTransport({
    service:'gmail',
    port:465,
    secure:true,
    auth:{
        user:mail_user,
        password:mail_password
    }
})

// creating the html fro email
const createHtml = (hello, personRequestingToContact,name, surname, message)=>{
    return `
    <h1>${hello}</h1>
    <p>${personRequestingToContact} ${mailContent}</p>
    <h2>Name: ${name}, Surname:${surname}</h2>
    <h3>Message:</h3>
    <p>${message}</p>
`;
}

//send mail method
const sendMail = asyncHandler(async(req, res) => {
    const contactForm = req.body;
    const details = {
        from: mail_user,
        to : mail_receiver,
        subject:subject,
        html: createHtml(helloText,contactForm.email, contactForm.name, contactForm.surname,contactForm.message)

    }
    try {
        mailTransporter.sendMail(details, (err)=>{
             console.log(err)
             console.log("I am in an error");
        });
        // const todo = await Todo.create(req.body)
        res.status(200).json({
            description:'CONTACTS.MAIL.MAIL_SUCCESS'
        });
        
    } catch (error) {
        res.status(500).json({
            description:'CONTACTS.MAIL.MAIL_FAILURE'
        });
        console.log(error.message)
        throw new Error(error.message);
    }
})







module.exports = {
    sendMail
}