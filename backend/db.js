
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Aryantechnologies:PqAyC2ICONFftetW@cluster0.0c1mfma.mongodb.net/todos");

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos', todoSchema);

module.exports = {
    todo 
}