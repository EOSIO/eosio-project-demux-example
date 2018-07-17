function logUpdate({ state, payload, blockInfo, context }) {
  console.info("State updated");
}

const account = process.env.EOS_ENV === "local" ? process.env.EOS_LOCAL_CONTRACT_ACCOUNT : process.env.EOS_TEST_CONTRACT_ACCOUNT

const effects = [
  {
    actionType: `${account}::likepost`,
    effect: logUpdate
  }
];

module.exports = effects;
