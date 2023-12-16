import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([
    {
      id: 1,
      lastname: 'morizet',
      firstname: 'thibault',
      email: 'thibaultmorizet@icloud.com',
      password: '$2a$10$n3sx1S46/Tmo/WGbnqsVqeYHxS9NRHNrr8T82KnFnnCg01VFlJZyq',
      roles: "['ROLE_ADMIN']"
    }
  ])
}
