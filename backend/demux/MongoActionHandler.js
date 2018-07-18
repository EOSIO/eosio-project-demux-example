const {
  handlers: { AbstractActionHandler }
} = require("demux");
const db = require("../db")

class ObjectActionHandler extends AbstractActionHandler {
  async handleWithState(handle) {
    await handle(db.getConnection());
  }
}

module.exports = ObjectActionHandler;
