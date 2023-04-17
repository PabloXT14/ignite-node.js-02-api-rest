import fastify from 'fastify'

const PORT = 3333
const server = fastify()

server.get('/', async (request, reply) => {
  return { message: 'Hello World 🚀' }
})

server
  .listen({ port: PORT })
  .then(() => console.log(`Server listening on port ${PORT}`))
