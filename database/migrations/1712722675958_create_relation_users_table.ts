import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'relation_users'
  protected foreignUser = 'users'
  protected foreignRole = 'roles'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('slug').notNullable().unique()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable(this.foreignUser)
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable(this.foreignRole)
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .defaultTo(1)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
