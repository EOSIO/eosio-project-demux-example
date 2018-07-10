const {
  readers: {
    NodeosActionReader // Let's read from an EOS node
  },
  watchers: { AbstractActionWatcher } // Don't need anything special, so let's use the base Action Watcher
} = require("demux");

const request = require("request-promise-native");

const MyActionHandler = require("./MyActionHandler");
const MyActionWatcher = require("./MyActionWatcher");

// Import Updaters and Effects, which are arrays of objects:
// [ { actionType:string, (updater|effect):function }, ... ]
const updaters = require("./updaters");
const effects = require("./effects");

const actionHandler = new MyActionHandler({
  updaters,
  effects
});

const actionReader = new NodeosActionReader(
  "http://localhost:8888", // Locally running nodeos
  22900, // Start at most recent blocks
  true,
  600,
  request
);

const actionWatcher = new MyActionWatcher(
  actionReader,
  actionHandler,
  10000 // Poll at twice the block interval for less latency
);

module.exports = actionWatcher;
