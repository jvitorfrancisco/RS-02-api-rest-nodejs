import { FastifyInstance } from "fastify";
import { transactionsRoutes } from "./transactions";
import cookie from "@fastify/cookie";

export async function router(app: FastifyInstance) {
    app.register(cookie)

    transactionsRoutes(app)
}