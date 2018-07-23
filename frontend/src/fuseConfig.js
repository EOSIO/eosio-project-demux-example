const fuseConfig = {
  shouldSort: true,
  keys: [
    {
      name: "title",
      weight: 0.5,
    }, {
      name: "content",
      weight: 0.4,
    },
    {
      name: "tag",
      weight: 0.1,
    }
  ]
}

export default fuseConfig
