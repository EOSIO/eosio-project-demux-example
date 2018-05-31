import Eos from 'eosjs';

const EOS_CONFIG = {
  keyProvider: ['<Private Key>'], // Your private key
  httpEndpoint: 'http://127.0.0.1:8888' // EOS http endpoint
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
    // return this.eos.contract(this.contractName).then(contract => {
    //   contract
    //     .createpost('blog', newPost.title, newPost.content, newPost.tag, {
    //       authorization: 'blog'
    //     })
    //     .then(res => {
    //       console.log(res);
    //       this.setState({ loading: false });
    //     })
    //     .catch(err => {
    //       this.setState({ loading: false });
    //       console.log(err);
    //     });
    // });

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
