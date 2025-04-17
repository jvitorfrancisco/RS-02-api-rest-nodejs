import { FastifyInstance } from "fastify";
import { knex } from "../config/database";

export async function transactionsRoutes(app: FastifyInstance) {
    app.register((app) => {
        app.get('/hello', () => {
            return knex('sqlite_schema').select('*')
        })
    }, { prefix: 'transactions' })
}