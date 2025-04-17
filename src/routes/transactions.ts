import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { knex } from "../config/database";

export async function transactionsRoutes(app: FastifyInstance) {
    app.register(routes, { prefix: 'transactions' })
}

async function routes (app: FastifyInstance) {
    const tableName = 'transactions'

    app.post('/', async (request, reply) => {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        const { title, amount, type } = createTransactionBodySchema.parse(request.body)

        await knex(tableName).insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
        })

        return reply.code(201).send()
    })
}