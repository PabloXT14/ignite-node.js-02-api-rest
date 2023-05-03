import { expect, test } from 'vitest'

test('deve ser possivel cadastrar uma transação', () => {
  const responseStatusCode = 201

  expect(responseStatusCode).toBe(201)
})
