require("dotenv").config();
const express = require("express");
var cors = require('cors');
var app = express();
const demux = require("./demux");
const db = require("./db")
const Post = require("./models/post");

app.use(cors())

app.get("/posts", (req, res) => {
    Post.find({}, function (err, posts) {
        res.send(posts);
    });
});

demux.watch();

db.connect();

app.listen(process.env.PORT, () => console.log("Example app listening on port 4000!"));
