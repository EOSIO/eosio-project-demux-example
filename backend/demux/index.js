const {
  readers: {
    eos: { NodeosActionReader }
  },
  watchers: { BaseActionWatcher }
} = require("demux")

const MongooseActionHandler = require("./MongooseActionHandler")

const updaters = require("./updaters")
const effects = require("./effects")

const actionHandler = new MongooseActionHandler(updaters, effects, process.env.MONGODB_URL)

const actionReader = new NodeosActionReader(
  process.env.EOS_ENV === "local" ? process.env.EOS_LOCAL_HTTP_URL : process.env.EOS_TEST_HTTP_URL,
  6024400 // First actions relevant to this dapp happen at this block
);

const actionWatcher = new BaseActionWatcher(
  actionReader,
  actionHandler,
  250 // Poll at twice the block interval for less latency
);

module.exports = actionWatcher;
