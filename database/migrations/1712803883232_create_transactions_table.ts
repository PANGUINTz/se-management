import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'
  protected foreignCustomer = 'customers'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('menu').notNullable()
      table.string('ros').nullable()
      table.string('cyl_r').nullable()
      table.string('axr').nullable()
      table.string('addr').nullable()
      table.string('los').nullable()
      table.string('cyl_l').nullable()
      table.string('axl').nullable()
      table.string('addl').nullable()
      table.string('pdr').nullable()
      table.string('pdl').nullable()
      table.string('shr').nullable()
      table.string('shl').nullable()
      table.string('f_type').nullable()
      table.string('f_price').nullable()
      table.string('f_brand').nullable()
      table.string('l_type').nullable()
      table.string('l_price').nullable()
      table.string('price').nullable()
      table.date('purchase_date').nullable()
      table
        .integer('customer_id')
        .unsigned()
        .references('id')
        .inTable(this.foreignCustomer)
        .onUpdate('CASCADE')
        .onDelete('CASCADe')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
