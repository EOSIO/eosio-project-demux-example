const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

let Post = null

try {
    const PostSchema = new Schema({
        author: String,
        title: String,
        content: String,
        tag: String,
        likes:  {
            type: Number,
            default: 0
        },
        postConfirmed: {
            type: Boolean,
            default: false
        }
    });
    PostSchema.plugin(AutoIncrement, {inc_field: 'contractPkey'});
    Post = mongoose.model('Post', PostSchema);
} catch (e) {
    Post = mongoose.model('Post');
}

module.exports = Post;