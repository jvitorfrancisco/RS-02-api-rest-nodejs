import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from '../config/database'
import { checkSessionIdExistance } from '../middlewares/check-session-id-existance'

export async function transactionsRoutes(app: FastifyInstance) {
  app.register(routes, { prefix: 'transactions' })
}

async function routes(app: FastifyInstance) {
  const tableName = 'transactions'

  app.get(
    '/',
    {
      preHandler: checkSessionIdExistance,
    },
    async () => {
      const transactions = await knex('transactions').select()

      return { transactions }
    },
  )

  app.get(
    '/summary',
    {
      preHandler: checkSessionIdExistance,
    },
    async () => {
      const summary = await knex('transactions')
        .sum('amount', { as: 'amount' })
        .first()

      return { summary }
    },
  )

  app.get('/:id', async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionParamsSchema.parse(request.params)

    const transaction = await knex('transactions').where('id', id).first()

    return { transaction }
  })

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      })
    }

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    await knex(tableName).insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.code(201).send()
  })
}
