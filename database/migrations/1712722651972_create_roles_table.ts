import { BaseSchema } from '@adonisjs/lucid/schema'
import { Roles } from '../../const/Enum.js'

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('role').unique().notNullable()

      this.defer(async (db) => {
        await db
          .table(this.tableName)
          .multiInsert([
            { role: Roles.GUEST },
            { role: Roles.ADMIN },
            { role: Roles.OWNER },
            { role: Roles.STAFF },
          ])
      })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
