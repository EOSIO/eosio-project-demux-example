const {
    readers: {
      eos: { NodeosActionReader } // Let's read from an EOS node
    },
    watchers: { BaseActionWatcher }, // Don't need anything special, so let's use the base Action Watcher
  } = require("demux-js")
  
  // Assuming you've already created a subclass of AbstractActionHandler
  const MyActionHandler = require("./MyActionHandler")
  
  // Import Updaters and Effects, which are arrays of objects:
  // [ { actionType:string, (updater|effect):function }, ... ] 
  const updaters = require("./updaters")
  const effects = require("./effects")
  
  const actionHandler = new MyActionHandler({
    updaters,
    effects,
  })
  
  const actionReader = new NodeosActionReader({
    nodeosEndpoint: "http://some-nodeos-endpoint:8888", // Locally hosted node needed for reasonable indexing speed
    startAtBlock: 12345678, // First actions relevant to this dapp happen at this block
  })
  
  const actionWatcher = new BaseActionWatcher({
    actionReader,
    actionHandler,
    pollInterval: 250, // Poll at twice the block interval for less latency
  })
  
  actionWatcher.watch() // Start watch loop