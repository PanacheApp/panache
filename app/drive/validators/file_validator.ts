import vine from '@vinejs/vine'

export const fileValidator = vine.compile(
  vine.object({
    file: vine.file(),
    parent_id: vine.string().exists(async (db, value) => {
        const file = await db
          .from('files')
          .where('id', value)
          .first()
        return file
    })
  })
)
