const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    raw: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    checked: Boolean,
});
const TodoModel = mongoose.model('Todo', Schema);

module.exports = TodoModel;
