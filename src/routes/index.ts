import { FastifyInstance } from "fastify";
import { transactionsRoutes } from "./transactions";

export async function router(app: FastifyInstance) {
    transactionsRoutes(app)
}