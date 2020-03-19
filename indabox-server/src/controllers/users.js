const fp = require("lodash/fp")
const {
  User,
  userTitle: titles,
  userRoles: roles,
  userCountries: countries
} = require("../models/user")
require("../models/quota")
require("../models/payment")
const { hashPassword } = require("../services/crypto")

class UsersController {
  /**
   * getAll ...
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  static async getAll(req, res, next) {
    try {
      const { user } = req.session
      const users = await User.find().where("role.value").gte(user.role.value)
        .select("-password")

      res.json(users)
    } catch (e) {
      next(e)
    }
  }

  /**
   * get ...
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  static async get(req, res, next) {
    try {
      const { userId } = req.params
      const user = await User.fetch(userId)

      res.json(user)
    } catch (e) {
      next(e)
    }
  }

  /**
   * create ...
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  static async create(req, res, next) {
    try {
      const { password, role, ...body } = req.body

      body.role = roles[role.toLocaleLowerCase()]

      if (password) {
        body.password = hashPassword(password)
      }

      const activeUser = fp.get("session.user._id", req)
      body.createdBy = activeUser
      body.updatedBy = activeUser

      const user = await User.create(body)

      res.json(user)
    } catch (e) {
      next(e)
    }
  }

  /**
  * update ...
  * @param {object} req
  * @param {object} res
  * @param {object} next
  */
  static async update(req, res, next) {
    try {
      const { userId } = req.params
      const { password, ...body } = req.body

      if (password) {
        body.password = hashPassword(password)
      }

      body.updatedBy = fp.get("session.user._id", req)

      const user = await User.patch(userId, req.body)

      res.json(user)
    } catch (e) {
      next(e)
    }
  }

  /**
   * getMetadata ...
   * @param {object} req
   * @param {object} res
   */
  static getMetadata(req, res) {
    const { role } = req.session.user
    const _roles = fp.transform((accum, elem) => {
      if (elem.value >= role.value) {
        accum.push(elem)
      }
      return accum
    }, [], roles)

    res.json({ titles, countries, roles: _roles })
  }
}

module.exports = UsersController
