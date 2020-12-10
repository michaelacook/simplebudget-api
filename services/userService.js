const bcrypt = require("bcryptjs")
const { User, Budget, Category } = require("../models/index")

module.exports = {
  /**
   * Get a single user by id
   * @param {String} id - user PK
   * @param {Boolean} budget - default false, used to determine budget eager load
   * @return {Promise} user on success, err on fail
   */
  getUser: async (id, budget = false) => {
    try {
      await User.sync()
      const options = {
        where: {
          id: id,
        },
      }
      if (budget) {
        options["include"] = {
          model: Budget,
          include: {
            model: Category,
          },
        }
      }
      const user = await User.findOne(options)
      return user
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Add a new user to the data store
   * @param {Object} destructured HTTP payload
   * @return {Promise} newly created user id on success, err on fail
   */
  createUser: async ({
    firstName,
    lastName,
    email,
    password,
    netSalary,
    netMonthlyIncome,
  }) => {
    try {
      await User.sync()
      const salt = bcrypt.genSaltSync(4)
      password = bcrypt.hashSync(password, salt)
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        netSalary,
        netMonthlyIncome,
      })
      return user.id
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Update a user in the data store
   * @param {Number} id - user PK
   * @param {Object} payload - HTTP body
   * @return {Promise} true on success, err on fail
   */
  updateUser: async (id, payload) => {
    try {
      await User.sync()
      const user = await User.findByPk(id)
      for (let name in payload) {
        if (name === "password") {
          const salt = bcrypt.genSaltSync(4)
          payload[name] = bcrypt.hashSync(password, salt)
        }
        user[name] = payload[name]
        await user.save()
      }
      return true
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Hard delete user in the data store
   * @param {Number} id - user PK
   * @return {Promise} true on success, err on fail
   */
  deleteUser: async (id) => {
    try {
      await User.sync()
      await User.destroy({
        where: {
          id: id,
        },
      })
      return true
    } catch (err) {
      Promise.reject(err)
    }
  },
}
