import vine from '@vinejs/vine'

export const businessOrganizationValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
    sirenSiret: vine.string().trim().minLength(9).maxLength(14),
    nafNaceNoga: vine.string().trim().minLength(2).maxLength(7),
    vatNumber: vine.string().trim().optional(),
    address: vine.string().trim().minLength(1).maxLength(255),
    addressComplement: vine.string().trim().optional(),
    postalCode: vine.string().trim().minLength(1).maxLength(10),
    city: vine.string().trim().minLength(1).maxLength(100),
    country: vine.string().trim().minLength(1).maxLength(100),
    phoneNumber: vine.string().trim().optional(),
    website: vine.string().trim().url().optional(),
  })
)
