import { BaseActionWatcher } from 'demux'
import { NodeosActionReader } from 'demux-eos'

import ActionHandler from './ActionHandler'

import updaters from './updaters'
import effects from './effects'

const actionHandler = new ActionHandler(updaters, effects, process.env.MONGODB_URL)

const actionReader = new NodeosActionReader(
  process.env.EOSIO_HTTP_URL,
  parseInt(process.env.EOSIO_STARTING_BLOCK, 10) // First actions relevant to this dapp happen at this block
)

const actionWatcher = new BaseActionWatcher(
  actionReader,
  actionHandler,
  250 // Poll at twice the block interval for less latency
)

export default actionWatcher
