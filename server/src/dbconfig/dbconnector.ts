import { Pool } from 'pg';

const pool = new Pool ({
    max: 20,
    connectionString: process.env.CONNECTION_STRING,
    idleTimeoutMillis: 30000
});

export default pool;