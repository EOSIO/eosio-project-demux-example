const {
  watchers: { AbstractActionWatcher }
} = require("demux");

class ActionWatcher extends AbstractActionWatcher {
  async handleBlock(handle) {
    return Promise.resolve([false]);
  }
}

module.exports = ActionWatcher;
