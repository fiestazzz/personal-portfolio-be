const mongoose = require('mongoose')

const mailSchema = mongoose.Schema(
    {
        sender:{
            type: String,
            required: true
        },
        recipient: {
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        surname:{
            type: String,
            required: true
        },
       subject :{
            type: String,
            required:true
        },
        mailContent: {
            type: String,
            default:true
        },
        sent: {
            type: Boolean,
            default:false
        },
    },
    {
        timestamps: true
    }
)


const Mail = mongoose.model('Mail', mailSchema);

module.exports = Mail;