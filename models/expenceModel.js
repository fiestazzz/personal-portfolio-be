const mongoose = require('mongoose')

const expenceSchema = mongoose.Schema(
    {
        expenceName: {
            type: String,
            required: [true, "Please enter a an expence name"]
        },
        amount: {
            type: Number,
            required: [true, "Please enter an amount"]
        },
        currency: {
            type: String,
            required: [true, "Please enter a currency"]
        },
        date:{
            type:Date,
            required: [true, "Please enter the date of the expence"]
        }

    },
    {
        timestamps: true
    }
)


const Expence = mongoose.model('Expence', expenceSchema);

module.exports = Expence;