require("dotenv").config();
const express = require("express");
const demux = require("./demux");
const app = express();

demux.watch();

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(4000, () => console.log("Example app listening on port 4000!"));
