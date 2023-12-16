import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('webtoons-tags').del()

  // Inserts seed entries
  await knex('webtoons-tags').insert([
    {
      id: 1,
      webtoon_id: 1,
      tag_id: 1
    },
    { id: 2, webtoon_id: 1, tag_id: 3 }
  ])
}
