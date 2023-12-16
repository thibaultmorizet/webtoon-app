import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('authors').del()

  // Inserts seed entries
  await knex('authors').insert([
    { id: 1, name: 'Eichiro Oda' },
    { id: 2, name: 'Masashi Kishimoto' },
    { id: 3, name: 'Chugong' }
  ])
}
