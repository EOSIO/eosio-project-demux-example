require("dotenv").config();
var app = require('express')();
const cors = require('cors');
const demux = require("./demux");
const Post = require("./models/post");
const io = require("./io")

app.use(cors())

app.get("/posts", (req, res) => {
    Post.find({}, function (err, posts) {
        res.send(posts);
    });
});

const server = app.listen(process.env.PORT, () => console.log("Example app listening on port 4000!"));

io.connect(server, (socket) => {
    io.setSocket(socket);
    demux.watch();
})



