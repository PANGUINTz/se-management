import RelationUser from '#models/relation_user'
import Role from '#models/role'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AccountsController {
  queryBuilder = async (id: number = 0) => {
    const builder = RelationUser.query()
      .select(`${User.table}.*`, `${Role.table}.role`)
      .join(`${User.table}`, `${User.table}.id`, `${RelationUser.table}.user_id`)
      .join(`${Role.table}`, `${Role.table}.id`, `${RelationUser.table}.role_id`)
    if (id) {
      builder.where(`${User.table}.id`, id)
    }
    return builder
  }

  async index({ response }: HttpContext) {
    try {
      const accounts = await this.queryBuilder()
      response.send({ message: 'Success', status: true, data: accounts })
    } catch (error) {
      console.log(error)
      return response.send({ message: 'Error.', status: false, error: error?.code })
    }
  }
}
