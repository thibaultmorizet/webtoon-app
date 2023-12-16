import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('webtoons-authors').del()

  // Inserts seed entries
  await knex('webtoons-authors').insert([
    {
      id: 1,
      webtoon_id: 1,
      author_id: 3
    }
  ])
}
