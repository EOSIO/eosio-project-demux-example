const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Post = null

try {
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
    Post = mongoose.model('Post', PostSchema);
} catch (e) {
    Post = mongoose.model('Post');
}

module.exports = Post;