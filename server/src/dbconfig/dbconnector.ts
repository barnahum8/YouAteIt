import { Pool } from 'pg';

const pool = new Pool ({
    max: 20,
    connectionString: 'postgres://mseafcnw:4FJXc6cPat7rARyDiJ6-jxebqOmsIzE9@hattie.db.elephantsql.com:5432/mseafcnw',
    idleTimeoutMillis: 30000
});

export default pool;