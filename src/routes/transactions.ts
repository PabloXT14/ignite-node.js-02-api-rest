import crypto from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    try {
      const { title, amount, type } = createTransactionBodySchema.parse(
        request.body,
      )

      let sessionId = request.cookies.sessionId

      if (!sessionId) {
        sessionId = crypto.randomUUID()

        // Create a cookie
        reply.cookie(
          'sessionId', // name
          sessionId, // value
          {
            // options
            path: '/', // rotas que poderão utilizar esse cookie (/ = todas)
            maxAge: 60 * 60 * 24 * 7, // 7 dias em segundos
          },
        )
      }

      await knex('transactions').insert({
        id: crypto.randomUUID(),
        title,
        amount: type === 'credit' ? amount : amount * -1,
        session_id: sessionId,
      })

      return reply.status(201).send()
    } catch (error) {
      console.log(error)

      if (error instanceof z.ZodError) {
        const { issues } = error
        return reply.status(400).send({ issues })
      }

      return reply.status(500).send({ error })
    }
  })

  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies

      const transactions = await knex('transactions')
        .select('*')
        .where('session_id', sessionId)

      return reply.status(200).send({ transactions })
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      try {
        const { id } = getTransactionParamsSchema.parse(request.params)
        const { sessionId } = request.cookies

        const transaction = await knex('transactions')
          .where({
            id,
            session_id: sessionId,
          })
          .first()

        return reply.status(200).send({ transaction })
      } catch (error) {
        console.log(error)

        if (error instanceof z.ZodError) {
          const { issues } = error
          return reply.status(400).send({ issues })
        }

        return reply.status(500).send({ error })
      }
    },
  )

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      return reply.status(200).send({ summary })
    },
  )

  app.put(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const updateTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const updateTransactionBodySchema = z.object({
        title: z.string().optional(),
        amount: z.number().optional(),
        type: z.enum(['credit', 'debit']),
      })

      try {
        const { id } = updateTransactionParamsSchema.parse(request.params)
        const { title, amount, type } = updateTransactionBodySchema.parse(
          request.body,
        )
        const { sessionId } = request.cookies

        const transaction = await knex('transactions')
          .where({
            id,
            session_id: sessionId,
          })
          .first()

        if (!transaction) {
          return reply.status(404).send({ message: 'Transaction not found' })
        }

        await knex('transactions')
          .update({
            title,
            amount: amount
              ? type === 'credit'
                ? amount
                : amount * -1
              : type === 'credit'
              ? transaction.amount * -1
              : transaction.amount,
          })
          .where({
            id,
            session_id: sessionId,
          })

        return reply.status(200).send()
      } catch (error) {
        console.log(error)

        if (error instanceof z.ZodError) {
          const { issues } = error
          return reply.status(400).send({ issues })
        }
        return reply.status(500).send({ error })
      }
    },
  )

  app.delete(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const deleteTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      try {
        const { id } = deleteTransactionParamsSchema.parse(request.params)
        const { sessionId } = request.cookies

        const transaction = await knex('transactions')
          .where({
            id,
            session_id: sessionId,
          })
          .first()

        if (!transaction) {
          return reply.status(404).send({ message: 'Transaction not found' })
        }

        await knex('transactions').delete().where({
          id,
          session_id: sessionId,
        })

        return reply.status(204).send()
      } catch (error) {
        console.log(error)

        if (error instanceof z.ZodError) {
          const { issues } = error
          return reply.status(400).send({ issues })
        }

        return reply.status(500).send({ error })
      }
    },
  )
}
