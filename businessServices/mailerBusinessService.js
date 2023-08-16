const mailer = require('nodemailer');
const asyncHandler = require('express-async-handler')
require('dotenv').config()
const { createHtmlForMe } =  require('../htmlMailTemplates/htmlMailTemplates');
const Mail = require('../models/mailModel');

const mail_user = process.env.MAIL_USER;
const mail_password = process.env.MAIL_PASSWORD;
const mail_receiver = process.env.MAIL_RECEIVER;
const subject = process.env.CONTACT_ME_MAIL_SUBJECT;

const helloText = process.env.CONTACT_ME_MAIL_CONTENT_HELLO;
const mailContent = process.env.CONTACT_ME_MAIL_CONTENT;


//creating the mail transporter
const mailTransporter = mailer.createTransport({
    service:'gmail',
    port:587,
    secure:true,
    auth:{
        user:mail_user,
        pass:mail_password
    }
})



//send mail method
const sendMail = asyncHandler(async(req, res) => {
    const contactForm = req.body;
    const details = {
        from: contactForm.email,
        to : mail_receiver,
        subject:subject,
        html: createHtmlForMe(helloText, mailContent ,contactForm.email, contactForm.name, contactForm.surname,contactForm.message)

    }
    let mailToSave = {
        sender:contactForm.email,
        recipient:mail_receiver,
        name: contactForm.name,
        surname:contactForm.surname,
        subject:subject,
        mailContent:contactForm.message,
        sent:true
    }

        mailTransporter.sendMail(details, async (err)=>{
            if(err){
             console.log(err)
             mailToSave.sent = false;
             const mail = await Mail.create(mailToSave);
             res.status(500).json({
                description:'CONTACTS.MAIL.MAIL_FAILURE',
                mail: mail
            });
            }
            else{
                const mail = await Mail.create(mailToSave);
                res.status(200).json({
                    description:'CONTACTS.MAIL.MAIL_SUCCESS',
                    mail: mail
                });
            }
             
        });
        // const todo = await Todo.create(req.body)
        
        

        
})







module.exports = {
    sendMail
}