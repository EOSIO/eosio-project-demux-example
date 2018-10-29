import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'eosjs'

export default class EOSIOClient {
  constructor (contractAccount) {
    const rpc = new JsonRpc(process.env.REACT_APP_EOSIO_HTTP_URL)
    const signatureProvider = new JsSignatureProvider([process.env.REACT_APP_EOSIO_PRIVATE_KEY])
    this.contractAccount = contractAccount
    this.eos = new Api({ rpc, signatureProvider })
  }

  transaction = async (actor, action, data) => {
    try {
      await this.eos.transact({
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
    } catch (e) {
      console.log('Caught exception: ' + e);
      if (e instanceof RpcError) {
        console.log(JSON.stringify(e.json, null, 2));
      }
    }
  }
}
