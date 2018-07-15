function updatePosts({ state, payload, blockInfo, context }) {
  console.log(state);
  console.log(payload);
}

const account = process.env.EOS_ENV === "local" ? process.env.EOS_LOCAL_CONTRACT_ACCOUNT : process.env.EOS_TEST_CONTRACT_ACCOUNT

const updaters = [
  {
    actionType: `${account}::likepost`, //account::action name
    updater: updatePosts
  }
];

module.exports = updaters;
