const { Quota } = require("./model")

const get = async (req, res) => {
  const { query } = req
  const quotas = await Quota.getMany(query)
  res.json(quotas)
}

module.exports = {
  get
}
