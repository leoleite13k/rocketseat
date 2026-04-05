import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database'
import { env } from './env'

const app = fastify()

app.get('/', async () => {
  const transactions = await knex('transactions').insert({
    id: crypto.randomUUID(),
    title: 'New Transaction',
    amount: 1000,
  }).returning('*')

  return transactions
})

app.listen({ port: env.PORT }).then(() => {
  console.log(`HTTP Server is running on http://localhost:${env.PORT}`)
})
