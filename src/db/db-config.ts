import pgPromise from 'pg-promise';
import * as dotenv from "dotenv";
import Promise from 'bluebird';

dotenv.config();
const pgp = pgPromise({ promiseLib: Promise, noLocking: true })

const dbUrl: string = String(process.env.DATABASE_URL as string)
export const db = pgp(dbUrl);
