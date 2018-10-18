import { Api, Rpc, SignatureProvider } from 'eosjs'

export default class EOSIOClient {
  constructor (contractAccount) {
    const rpc = new Rpc.JsonRpc(process.env.REACT_APP_EOSIO_HTTP_URL)
    const signatureProvider = new SignatureProvider([process.env.REACT_APP_EOSIO_PRIVATE_KEY])
    this.contractAccount = contractAccount
    this.eos = new Api({ rpc, signatureProvider })
  }

  transaction = (actor, action, data) => {
    return this.eos.transact({
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
    }, {
      blocksBehind: 3,
      expireSeconds: 30
    })
  }
}
