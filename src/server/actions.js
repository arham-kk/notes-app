export const createNote = async (args, context) => {
    return context.entities.Note.create({
      data: { content: args.content }
    })
  }

export const updateNote = async (args, context) => {
    return context.entities.Note.update({
      where: { id: args.noteId },
      data: {
        content: args.data.content
      }
    })
  }

export const deleteNote = async (args, context) => {
    return context.entities.Note.delete({
      where: { id: args.noteId }
    })
  }