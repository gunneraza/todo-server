import { rules, schema } from '@ioc:Adonis/Core/Validator'

const todoSchema = schema.create({
  title: schema.string.optional({ trim: true }, [rules.maxLength(60)]),
  description: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
  status: schema.enum(['active', 'complete', 'delete'] as const),
})

export default todoSchema
