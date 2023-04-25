import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database'
import { env } from './env'

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
  .listen({ port: env.PORT })
  .then(() => console.log(`Server listening on port ${env.PORT}`))
