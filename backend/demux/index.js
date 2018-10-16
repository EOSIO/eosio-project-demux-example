const { BaseActionWatcher } = require('demux')
const { MongoActionReader } = require('demux-eos')

const ActionHandler = require('./ActionHandler')

const updaters = require('./updaters')
const effects = require('./effects')

const actionHandler = new ActionHandler(
  updaters,
  effects,
  process.env.MONGODB_HOST,
  process.env.MONGODB_DEMUX_DB_NAME
)

const actionReader = new MongoActionReader(
  process.env.MONGODB_HOST,
  parseInt(process.env.EOSIO_STARTING_BLOCK, 10), // First actions relevant to this dapp happen at this block
  false,
  600,
  process.env.MONGODB_EOS_DB_NAME
)

const actionWatcher = new BaseActionWatcher(
  actionReader,
  actionHandler,
  500
)

const start = async () => {
  await actionReader.initialize()
  actionWatcher.watch()
}

module.exports = {
  start
}
