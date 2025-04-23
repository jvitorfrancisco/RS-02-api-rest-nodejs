import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionIdExistance(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId

  if (!sessionId) reply.status(401).send('Unauthorized')
}
