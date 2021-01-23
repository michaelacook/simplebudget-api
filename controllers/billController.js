const billService = require("../services/billService")

module.exports = {
  /**
   * Handle route /bill/:id GET
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   * @param {Func} next - next middleware call
   */
  getBill: async function (req, res, next) {
    try {
      const id = req.params.id
      const bill = await billService.getBill(id)
      return res.status(200).json(bill)
    } catch (error) {
      next(error)
    }
  },

  /**
   * Handle route /bill GET
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   * @param {Func} next - next middleware call
   */
  getBills: async function (req, res, next) {
    try {
      const userId = req.user.id
      const bills = await billService.getAllBills(userId)
      return res.status(200).json(bills)
    } catch (error) {
      next(error)
    }
  },

  /**
   * Handle route /bill POST
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   * @param {Func} next - next middleware call
   */
  postBill: async function (req, res, next) {
    try {
      const userId = req.user.id
      const bill = await billService.addBill(userId, req.body)
      return res.status(201).json(bill)
    } catch (error) {
      next(error)
    }
  },

  /**
   * Handle route /bill/:id PUT
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   * @param {Func} next - next middleware call
   */
  putBill: async function (req, res, next) {
    try {
      const id = req.params.id
      const bill = await billService.updateBill(id, req.body)
      return res.status(200).json(bill)
    } catch (error) {
      next(error)
    }
  },

  /**
   * Handle route /bill/:id DELETE
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   * @param {Func} next - next middleware call
   */
  deleteBill: async function (req, res, next) {
    try {
      const id = req.params.id
      await billService.deleteBill(id)
      return res.status(204).end()
    } catch (error) {
      next(error)
    }
  },
}
