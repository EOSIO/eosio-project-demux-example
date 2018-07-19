const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    _id: String,
    author: String,
    title: String,
    content: String,
    tag: String,
    likes:  {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Post', PostSchema);