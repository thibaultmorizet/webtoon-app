import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('webtoons').del()

  // Inserts seed entries
  await knex('webtoons').insert([
    {
      id: 1,
      title: 'Solo leveling',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliqu',
      poster: 'poster.png',
      release_date: '2019-26-09',
      is_importing: false,
      studio_id: 1,
      language_id: 1,
      status_id: 1,
      category_id: 3
    }
  ])
}
