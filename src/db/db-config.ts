import "dotenv/config";
import Promise from 'bluebird';
import pgPromise from 'pg-promise';

const pgp = pgPromise({ promiseLib: Promise, noLocking: true })

const dbUrl: string = String(process.env.DATABASE_URL as string)
export const db = pgp(dbUrl);
