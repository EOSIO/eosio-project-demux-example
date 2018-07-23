import Eos from 'eosjs';

const EOS_CONFIG = {
  httpEndpoint: process.env.REACT_APP_EOS_HTTP_URL,
  chainId: process.env.REACT_APP_EOS_CHAIN_ID,
  keyProvider: [process.env.REACT_APP_EOS_PRIVATE_KEY],
  broadcast: true,
  sign: true
};


export default class EOSClient {
  constructor(contractName, contractSender) {
    this.contractName = contractName;
    this.contractSender = contractSender;

    this.eos = Eos(EOS_CONFIG);
  }

  getTableRows = table => {
    return this.eos.getTableRows(true, this.contractName, this.contractSender, table);
  };

  transaction = (actor, action, data) => {
    return this.eos.transaction({
      actions: [
        {
          account: this.contractName,
          name: action,
          authorization: [
            {
              actor: process.env.REACT_APP_EOS_ACCOUNT,
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
