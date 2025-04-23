import fastify from 'fastify'
import { env } from './env'
import { router } from './routes'

const app = fastify()

router(app)

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server running on 3333 🚀')
  })
