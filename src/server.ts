import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database'

const PORT = 3333
const server = fastify()

server.get('/transactions', async (request, reply) => {
  const test = await knex('transactions').select('*')

  return test
})

server.post('/transactions', async (request, reply) => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transação de test',
      amount: 1000,
    })
    .returning('*')

  return transaction
})

server
  .listen({ port: PORT })
  .then(() => console.log(`Server listening on port ${PORT}`))
