import vine from '@vinejs/vine'

export const forgotPasswordValidator = vine.compile(
  vine.object({
    localPart: vine.string().alphaNumeric().minLength(3).maxLength(255).trim().toLowerCase(),
  })
)
