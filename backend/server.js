require("dotenv").config();
var app = require('express')();
const cors = require('cors');
const demux = require("./demux");
const Post = require("./models/post");

app.use(cors())

app.get("/posts", (req, res) => {
    Post.find({}, function (err, posts) {
        res.send(posts);
    });
});

demux.watch();

const server = app.listen(process.env.PORT, () => console.log("Example app listening on port 4000!"));

const io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
});