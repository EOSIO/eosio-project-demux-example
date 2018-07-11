import eosjs from 'eosjs2'

const rpc = new eosjs.Rpc.JsonRpc(process.env.REACT_APP_EOS_ENV === 'local' ? process.env.REACT_APP_EOS_LOCAL_HTTP_URL : process.env.REACT_APP_EOS_TEST_HTTP_URL);
const signatureProvider = new eosjs.SignatureProvider([process.env.REACT_APP_EOS_PRIVATE_KEY]);

export default class EOSClient {
  constructor(contractName, contractSender) {
    this.contractName = contractName;
    this.contractSender = contractSender;

    this.eos = new eosjs.Api({ rpc, signatureProvider })
  }

  getTableRows = table => {
    return rpc.get_table_rows({json: true, code: this.contractSender, scope: this.contractName, table});
  };

  transaction = (actor, action, data) => {
    return this.eos.pushTransaction({
      blocksBehind: 3,
      expireSeconds: 30,
      actions: [
        {
          account: this.contractName,
          name: action,
          authorization: [
            {
              actor: actor,
              permission: 'active'
            }
          ],
          data: {
            ...data
          }
        }
      ]
    });
  };
}
