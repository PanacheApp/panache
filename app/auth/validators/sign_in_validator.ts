import vine from '@vinejs/vine'

export const signInValidator = vine.compile(
  vine.object({
    localPart: vine
      .string()
      .minLength(3)
      .maxLength(255)
      .trim()
      .regex(/^[a-zA-Z0-9._%+-]+$/)
      .toLowerCase(),
    password: vine.string().minLength(8),
  })
)
