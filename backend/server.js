require("dotenv").config();
const express = require("express");
const demux = require("./demux");
const app = express();

demux.watch();

const Post = require("./models/post");
app.get("/posts", (req, res) => {
    Post.find({}, function (err, posts) {
        res.send(posts);
    });
});

app.listen(4000, () => console.log("Example app listening on port 4000!"));
