var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
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