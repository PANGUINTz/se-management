import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class RelationUser extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slug: string

  @column()
  declare userId: number

  @column()
  declare roleId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  public serializeExtras() {
    return {
      email: this.$extras?.email,
      fullName: this.$extras?.full_name,
      role: this.$extras?.role,
      isActive: this.$extras?.is_active,
    }
  }
}
