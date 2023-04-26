import crypto from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { knex } from '../database'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/transactions', async (request, reply) => {
    const test = await knex('transactions').select('*')
    return test
  })

  app.post('/transactions', async (request, reply) => {
    const transaction = await knex('transactions')
      .insert({
        id: crypto.randomUUID(),
        title: 'Transação de test',
        amount: 1000,
      })
      .returning('*')
    return transaction
  })
}
