import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('tracksites').del()

  // Inserts seed entries
  await knex('tracksites').insert([{ id: 1, name: 'mangadex', url: 'https://mangadex.org' }])
}
