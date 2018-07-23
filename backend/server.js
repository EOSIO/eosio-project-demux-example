require("dotenv").config();
var app = require('express')();
const cors = require('cors');
const demux = require("./demux");
const postRoutes = require('./api/post/post.route');
const io = require("./utils/io");

app.use(cors());

app.use("/posts", postRoutes);

const server = app.listen(process.env.PORT, () => console.log("Example app listening on port 4000!"));

io.connect(server);

demux.watch();




