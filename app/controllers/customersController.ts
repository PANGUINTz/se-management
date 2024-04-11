import Customer from '#models/customer'
import { createCustomer } from '#validators/customer'
import type { HttpContext } from '@adonisjs/core/http'

export default class CustomersController {
  async index({ response }: HttpContext) {
    try {
      const customers = await Customer.all()
      return response.send({ message: 'Success', status: true, data: customers, code: 200 })
    } catch (error) {
      return response.send({ message: 'Error.', status: false, error: error?.code })
    }
  }

  async store({ response, request }: HttpContext) {
    try {
      const payload = request.all()
      const datas = await createCustomer.validate({
        ...payload,
        address: payload.address || '-',
        desease: payload.desease || '-',
      })

      const customer = await Customer.create(datas)
      customer.save()
      return response.send({ message: 'Success.', status: true, code: 201 })
    } catch (error) {
      console.log(error)
      return response.send({ message: 'Error.', status: false, error: error?.code })
    }
  }

  async edit({ response, request }: HttpContext) {
    try {
      const { id } = request.params()
      const customer = await Customer.query().where('id', id)
      return response.send({ message: 'Success', status: true, data: customer, code: 200 })
    } catch (error) {
      return response.send({ message: 'Error.', status: false, error: error?.code })
    }
  }

  async update({ response, request }: HttpContext) {
    try {
      const { id } = request.params()

      const data = await Customer.query().where('id', id).update(request.all())
      console.log(data)

      return response.send({ message: 'Success', status: true, code: 200 })
    } catch (error) {
      return response.send({ message: 'Error.', status: false, error: error?.code })
    }
  }
}
