import { afterAll, beforeAll, it } from 'vitest'
import request from 'supertest'

import { app } from '../src/app'

beforeAll(async () => {
  await app.ready() // esperando o servidor estar pronto
})

afterAll(async () => {
  await app.close() // encerrando o servidor
})

it('should user be able to create a new transaction', async () => {
  await request(app.server)
    .post('/transactions')
    .send({
      title: 'New Transaction',
      amount: 3000,
      type: 'credit',
    })
    .expect(201)
})
