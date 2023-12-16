import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('images').del()

  // Inserts seed entries
  await knex('images').insert([
    {
      id: 1,
      position: 1,
      name: 'firstImage.png',
      episode_id: 1
    },
    {
      id: 2,
      position: 2,
      name: 'secondImage.png',
      episode_id: 1
    },
    {
      id: 3,
      position: 3,
      name: 'thirdImage.png',
      episode_id: 1
    }
  ])
}
