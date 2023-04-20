import fastify from 'fastify'
import { knex } from './database'

const PORT = 3333
const server = fastify()

server.get('/', async (request, reply) => {
  const test = await knex('sqlite_schema').select('*')

  return test
})

server
  .listen({ port: PORT })
  .then(() => console.log(`Server listening on port ${PORT}`))
