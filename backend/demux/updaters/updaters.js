function updatePosts({ state, payload, blockInfo, context }) {
  console.log(payload)
}

const updaters = [
  {
    actionType: "blog::likepost", //account::action name
    updater: updatePosts
  }
];

module.exports = updaters;
