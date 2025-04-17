import fastify from "fastify";
import { knex } from "./config/database";
import { env } from "./env";

const http = fastify()

http.get('/hello', () => {
    return knex('sqlite_schema').select('*')
})

http.listen({
    port: env.PORT,
}).then(() => {
    console.log("HTTP Server running on 3333 🚀")
})