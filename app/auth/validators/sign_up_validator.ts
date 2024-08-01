import vine from '@vinejs/vine'

export const signUpValidator = vine.compile(
  vine.object({
    gender: vine.enum(['male', 'female']),
    firstName: vine.string().trim().minLength(1).maxLength(255),
    lastName: vine.string().trim().minLength(1).maxLength(255),
    localPart: vine
      .string()
      .minLength(3)
      .maxLength(255)
      .trim()
      .regex(/^[a-zA-Z0-9._%+-]+$/)
      .toLowerCase(),
    backupEmail: vine.string().email().trim().normalizeEmail().optional(),
    password: vine.string().minLength(8),
  })
)
