const { Quota } = require("./model")

const get = async (req, res) => {
  const { dateStart, dateEnd, field, sort, limit, page, ...filters } = req.query
  const quotas = await Quota.getMany(filters, { dateStart, dateEnd, field, sort, limit, page })
  res.json(quotas)
}

module.exports = {
  get
}
