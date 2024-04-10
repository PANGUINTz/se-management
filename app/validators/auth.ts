import vine from '@vinejs/vine'

export const signUpValidator = vine.compile(
  vine.object({
    email: vine.string().trim(),
    fullName: vine.string().trim(),
    password: vine.string().trim(),
  })
)

export const signInValidator = vine.compile(
  vine.object({
    email: vine.string().trim(),
    password: vine.string().trim(),
  })
)
