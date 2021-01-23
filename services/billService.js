const { Bill } = require("../models/index")

module.exports = {
  /**
   * Get a bill by primary key
   * @param {Number} id - bill PK
   * @return {Promise} bill on success, promise reject on fail
   */
  getBill: async function (id) {
    try {
      await Bill.sync()
      const bill = await Bill.findByPk(id)
      return bill
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Get all a user's bills
   * @param {Number} userId - user PK
   * @return {Promise} bills on success, promise reject on fail
   */
  getAllBills: async function (userId) {
    try {
      await Bill.sync()
      const bills = await Bill.findAll({
        where: {
          userId,
        },
      })
      return bills
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Add a bill to the data store
   * @param {Number} userId - user PK
   * @param {Object} payload - data to be added from HTTP payload
   */
  addBill: async function (userId, payload) {
    try {
      await Bill.sync()
      const bill = await Bill.create({
        title: payload.title,
        amount: payload.amount,
        due: payload.due,
        userId: payload.userId,
      })
      return bill
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Update a bill in the data store
   * @param {Number} id - bill PK
   * @param {Object} payload - data to be added from HTTP payload
   * @return {Promise} true on success, promise reject on fail
   */
  updateBill: async function (id, payload) {
    try {
      await Bill.sync()
      const bill = await Bill.findByPk(id)
      for (let key in payload) {
        bill[key] = payload[key]
        await bill.save()
      }
      return bill
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Hard delete a bill in the data store
   * @param {Number} id - bill PK
   * @return {Promise} true on success, promise reject on fail
   */
  deleteBill: async function (id) {
    try {
      await Bill.sync()
      await Bill.destroy({
        where: {
          id,
        },
      })
      return true
    } catch (err) {
      Promise.reject(err)
    }
  },
}
