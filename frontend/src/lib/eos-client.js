import Eos from 'eosjs';

const EOS_CONFIG = {
  chainId: '<Chain Id>',
  keyProvider: ['<Active Private Key>'],
  broadcast: true,
  sign: true
};

export default class EOSClient {
  constructor(contractName, contractSender) {
    this.contractName = contractName;
    this.contractSender = contractSender;

    this.eos = Eos.Localnet(EOS_CONFIG);
  }

  getTableRows = table => {
    return this.eos.getTableRows(true, this.contractName, this.contractSender, table);
  };

  transaction = (action, data) => {
    return this.eos.transaction({
      actions: [
        {
          account: this.contractName,
          name: action,
          authorization: [
            {
              actor: this.contractSender,
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
