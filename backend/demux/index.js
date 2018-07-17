const {
  readers: {
    eos: { NodeosActionReader } // Let's read from an EOS node
  },
  watchers: { BaseActionWatcher } // Don't need anything special, so let's use the base Action Watcher
} = require("demux")

// Assuming you've already created a subclass of AbstractActionHandler
const MongoActionHandler = require("./MongoActionHandler")

// Import Updaters and Effects, which are arrays of objects:
// [ { actionType:string, (updater|effect):function }, ... ]
const updaters = require("./updaters")
const effects = require("./effects")

const actionHandler = new MongoActionHandler(updaters, effects)

const actionReader = new NodeosActionReader(
  process.env.EOS_ENV === "local" ? process.env.EOS_LOCAL_HTTP_URL : process.env.EOS_TEST_HTTP_URL, // Locally hosted node needed for reasonable indexing speed
  6024400 // First actions relevant to this dapp happen at this block
);

const actionWatcher = new BaseActionWatcher(
  actionReader,
  actionHandler,
  250 // Poll at twice the block interval for less latency
);

module.exports = actionWatcher;
