import pool from '../dbconfig/dbconnector';
var format = require('pg-format');

class usersFoodTypesController {

  // adds the user food types, deletes old types if exists
    public async addUsersFoodTypes(req, res) {
        
        try {
            const client = await pool.connect();

            const deletesql = 'DELETE FROM usersFoodTypes WHERE email = $1';
            const email = [req.body.email]

            await client.query(deletesql,email,(err, res) => {
              if (err) {
                console.log(err.stack)
              } else {
                const values =[];

                for(let type of req.body.foodTypes){
                    values.push([req.body.email,type]);
                }

                const sql = format('INSERT INTO usersFoodTypes (email,id) VALUES %L',values); 

                client.query(sql,(err, res) => {
                    if (err) {
                      console.log(err.stack)
                    } else {
                      res.send(200);
                    }
                  })
              }
            })

            client.release();

        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default usersFoodTypesController;