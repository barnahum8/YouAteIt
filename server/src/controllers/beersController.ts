import pool from '../dbconfig/dbconnector';

class BeersController {

    // gets all beer types from db
    public async get(req, res) {
        try {
            const client = await pool.connect();

            const sql = "SELECT * FROM beers";
            const { rows } = await client.query(sql);
            const beers = rows;

            client.release();

            res.send(beers);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default BeersController;