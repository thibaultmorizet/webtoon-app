import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("status").del();

    // Inserts seed entries
    await knex("status").insert([
        { id: 1, name: "finished" },
        { id: 2, name: "onGoing" },
        { id: 3, name: "canceled" },
        { id: 4, name: "pausing" }
    ]);
};
