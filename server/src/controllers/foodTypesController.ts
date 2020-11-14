import pool from '../dbconfig/dbconnector';

class foodTypesController {

    // gets all food types from db
    public async get(req, res) {
        try {
            const client = await pool.connect();

            const sql = "SELECT * FROM foodTypes";
            const { rows } = await client.query(sql);
            const foodTypes = rows;

            client.release();

            res.send(foodTypes);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // adds new type to the db
    public async addType(req,res){
        try {
            const client = await pool.connect();

            const sql = 'INSERT INTO foodTypes (name) VALUES($1) RETURNING *';
            const values = [req.body.newType];

            await client.query(sql,values,(err, res) => {
                if (err) {
                  console.log(err.stack)
                }
              })

            client.release();

        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default foodTypesController;