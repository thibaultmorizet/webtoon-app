import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('tracked-webtoons').del()

  // Inserts seed entries
  await knex('tracked-webtoons').insert([
    {
      id: 1,
      user_id: 1,
      webtoon_id: 1,
      tracksite_id: 1,
      created_at: new Date().toISOString()
    }
  ])
}
