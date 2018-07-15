const {
  handlers: { AbstractActionHandler }
} = require("demux");

const mongoose = require("mongoose");

var mongoDB = "mongodb://127.0.0.1/my_database";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

class ObjectActionHandler extends AbstractActionHandler {
  async handleWithState(handle) {
    await handle(db);
  }
}

module.exports = ObjectActionHandler;
