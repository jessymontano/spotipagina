import argon2 from 'argon2';
import { db } from '@vercel/postgres';
//IGNORAR ESTO ERA PARA HACER LA TABLA DE LA BASE DE DATOS DBHJGBDFHJ
const users = [
    {
        id: '0528ef8b-95ea-4b21-812a-d6300e2c7418',
        username: 'eli',
        password: 'Berenice10!',
    },
    {
        id: '645360df-6d1d-4991-8526-5b58f15525b6',
        username: 'wiwi',
        password: 'r3gl4fl3x1'
    }
]

const client = await db.connect();

async function seedUsers() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password TEXT NOT NULL
        );
    `;

    const insertedUsers = await Promise.all(
        users.map(async (user) => {
            const hashedPassword = await argon2.hash(user.password);
            return client.sql`
                INSERT INTO users (id, username, password)
                VALUES (${user.id}, ${user.username}, ${hashedPassword})
                ON CONFLICT (id) DO NOTHING;
            `;
        }),
    );

    return insertedUsers;
}

export async function GET() {
    try {
        await client.sql`BEGIN`;
        await seedUsers();
        await client.sql`COMMIT`;

        return Response.json({ message: "Database seeded successfully"});
    } catch (error) {
        await client.sql`ROLLBACK`;
        return Response.json( {error}, {status: 500});
    }
}