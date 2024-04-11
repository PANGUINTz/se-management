import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare menu: string

  @column()
  declare ROS: string

  @column()
  declare CYL_R: string

  @column()
  declare Axr: string

  @column()
  declare Addr: string

  @column()
  declare LOS: string

  @column()
  declare CYL_L: string

  @column()
  declare Axl: string

  @column()
  declare Addl: string

  @column()
  declare PDR: string

  @column()
  declare PDL: string

  @column()
  declare SHR: string

  @column()
  declare SHL: string

  @column()
  declare FType: string

  @column()
  declare FPrice: number

  @column()
  declare LType: string

  @column()
  declare LPrice: number

  @column()
  declare FBrand: string

  @column()
  declare price: number

  @column()
  declare purchaseDate: DateTime

  @column()
  declare customerId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
