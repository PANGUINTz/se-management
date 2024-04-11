import vine from '@vinejs/vine'

export const createCustomer = vine.compile(
  vine.object({
    fullName: vine.string().trim(),
    age: vine.number(),
    telephone: vine.string().trim(),
    address: vine.string().trim(),
    desease: vine.string().trim(),
  })
)
