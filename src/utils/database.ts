import { createConnection } from 'mysql';
import { config } from 'dotenv';
import { DatabaseTables, DefaultQueryResult, QueryResult } from '../typings/database';
config();

const { db, db_h, db_u, db_p } = process.env;
export const database = createConnection({
    host: db_h,
    password: db_p,
    user: db_u,
    database: db
});

export const query = <T = DefaultQueryResult>(query: string): Promise<QueryResult<T>> => {
    return new Promise((resolve, reject) => {
        database.query(query, (error, response) => {
            if (error) return reject(error);
            resolve(response);
        });
    });
};
export const checkDatabase = async () => {
    await query(`SHOW TABLES`);
    await query(
        `CREATE TABLE IF NOT EXISTS ${DatabaseTables.Configs} ( guild_id VARCHAR(255) NOT NULL PRIMARY KEY, \`value\` LONGTEXT )`
    );
    await query(
        `CREATE TABLE IF NOT EXISTS ${DatabaseTables.languages} ( user_id VARCHAR(255) NOT NULL PRIMARY KEY, lang VARCHAR(255) NOT NULL DEFAULT 'en' )`
    );

    return true;
};
