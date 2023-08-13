const mongoose = require('mongoose')

const todoSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: [true, "Please enter a todo description"]
        },
        isDone: {
            type: Boolean,
            default:false
        }
    },
    {
        timestamps: true
    }
)


const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;