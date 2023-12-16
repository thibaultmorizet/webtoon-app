import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('artists').del()

  // Inserts seed entries
  await knex('artists').insert([
    { id: 1, name: 'Fuyuki23' },
  ])
}
