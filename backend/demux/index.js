const {
  readers: {
    eos: { NodeosActionReader }
  },
  watchers: { BaseActionWatcher }
} = require("demux")

const MongooseActionHandler = require("./MongooseActionHandler")

const updaters = require("./updaters")
const effects = require("./effects")
const models = require("../models");

const actionHandler = new MongooseActionHandler(updaters, effects, process.env.MONGODB_URL, models)

const actionReader = new NodeosActionReader(
  process.env.EOS_HTTP_URL,
  parseInt(process.env.EOS_STARTING_BLOCK) // First actions relevant to this dapp happen at this block
);

const actionWatcher = new BaseActionWatcher(
  actionReader,
  actionHandler,
  250 // Poll at twice the block interval for less latency
);

module.exports = actionWatcher;
