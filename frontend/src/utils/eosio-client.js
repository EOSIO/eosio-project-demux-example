import Eosjs from 'eosjs'

const EOSIO_CONFIG = {
  httpEndpoint: process.env.REACT_APP_EOSIO_HTTP_URL,
  chainId: process.env.REACT_APP_EOSIO_CHAIN_ID,
  keyProvider: [process.env.REACT_APP_EOSIO_PRIVATE_KEY],
  broadcast: true,
  sign: true
}

export default class EOSIOClient {
  constructor (contractAccount) {
    this.contractAccount = contractAccount
    this.eosio = Eosjs(EOSIO_CONFIG)
  }

  getTableRows = (scope, table) => this.eosio.getTableRows(true, this.contractAccount, scope, table);

  transaction = (actor, action, data) => this.eosio.transaction({
    actions: [
      {
        account: this.contractAccount,
        name: action,
        authorization: [
          {
            actor,
            permission: 'active'
          }
        ],
        data: {
          ...data
        }
      }
    ]
  });
}
