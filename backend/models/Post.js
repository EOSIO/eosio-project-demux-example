var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
    author: String,
    title: String,
    content: String,
    tag: String,
    likes: Number,
});

module.exports = mongoose.model('Post', PostSchema);