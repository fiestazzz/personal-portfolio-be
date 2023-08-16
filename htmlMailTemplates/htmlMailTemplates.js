
require('dotenv').config();


const createHtmlForMe = (hello, mailContent, personRequestingToContact, name, surname, message)=>{
    return `
    <h1>${hello}</h1>
    <p>${personRequestingToContact} ${mailContent}</p>
    <h2>Sender: </h2>
    <p>${name} ${surname}</p>
    <h3>Message:</h3>
    <p>${message}</p>
`;
}





module.exports = {
    createHtmlForMe
};