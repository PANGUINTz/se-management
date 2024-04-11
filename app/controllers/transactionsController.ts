import type { HttpContext } from '@adonisjs/core/http'
import Transaction from '#models/transaction'

export default class TransactionsController {
  async index({ response }: HttpContext) {
    try {
      const transactions = await Transaction.all()
      return response.send({ message: 'Success', status: true, data: transactions, code: 200 })
    } catch (error) {
      return response.send({ message: 'Error.', status: false, error: error?.code })
    }
  }

  async customer({ response, request }: HttpContext) {
    try {
      const { customerId } = request.params()
      console.log(customerId)

      const transactions = await Transaction.query()
        .where('customer_id', customerId)
        .orderBy('id', 'desc')
      return response.send({ message: 'Success', status: true, data: transactions, code: 200 })
    } catch (error) {
      console.log(error)

      return response.send({ message: 'Error.', status: false, error: error?.code })
    }
  }

  async store({ response, request }: HttpContext) {
    try {
      const customer = await Transaction.create(request.all())
      customer.save()
      return response.send({ message: 'Success.', status: true, code: 201 })
    } catch (error) {
      return response.send({ message: 'Error.', status: false, error: error?.code })
    }
  }

  async edit({ response, request }: HttpContext) {
    try {
      const { id } = request.params()
      const transaction = await Transaction.query().where('id', id)
      return response.send({ message: 'Success.', status: true, data: transaction, code: 200 })
    } catch (error) {
      return response.send({ message: 'Error.', status: false, error: error?.code })
    }
  }

  async update({ response, request }: HttpContext) {
    try {
      const { id } = request.params()
      await Transaction.query().where('id', id).update(request.all())
      return response.send({ message: 'Success.', status: true, code: 200 })
    } catch (error) {
      console.log(error)

      return response.send({ message: 'Error.', status: false, error: error?.code })
    }
  }
}
