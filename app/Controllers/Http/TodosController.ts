import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'
import todoSchema from 'App/Validations/todo.schema'

export default class TodosController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 6)
    const status = request.input('status', null)

    if (status) {
      return await Todo.query().where('status', status).paginate(page, limit)
    }

    return await Todo.query().paginate(page, limit)
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate({
        schema: todoSchema,
      })
      return Todo.create(data)
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  public async show({ params }) {
    return await Todo.findOrFail(+params.id)
  }

  public async update({ request, params }: HttpContextContract) {
    try {
      const data = await request.validate({
        schema: todoSchema,
      })
      await Todo.query().where('id', params.id).update(data)
    } catch (error) {
      return error
    }
  }

  public async destroy({ params }) {
    const todo = await Todo.findOrFail(+params.id)
    return await todo.delete()
  }
}
