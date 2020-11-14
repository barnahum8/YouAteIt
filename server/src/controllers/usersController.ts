import pool from '../dbconfig/dbconnector';
import foodTypesController from './foodTypesController';
import usersFoodTypesController from './usersFoodTypesController';
const foodTypeController = new foodTypesController();
const usersFoodTypeController = new usersFoodTypesController();

class usersController {

  // adds new user to db, updates user detail if already exists
    public async addUser(req, res) {
        try {
            const client = await pool.connect();

            const sql = 'INSERT INTO users (email,firstname,lastname,birthdate,beer,id,phone) VALUES($1, $2, $3, $4, $5, $6, $7)' + 
                        'ON CONFLICT (email) DO UPDATE SET firstname = $2 ,lastname = $3 ,birthdate = $4 ,beer = $5 ,id = $6 ,phone = $7 ';
            const values = [req.body.email,
                            req.body.firstname,
                            req.body.lastname,
                            req.body.birthdate,
                            req.body.beer ? req.body.beer : null,
                            req.body.id,
                            req.body.phone];

            await client.query(sql,values,(err, res) => {
                if (err) {
                  console.log(err.stack)
                } else {
                  if(req.body.newType){
                    foodTypeController.addType(req,res);
                  }
                  usersFoodTypeController.addUsersFoodTypes(req,res);

                }
              })

            client.release();

            res.send();
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default usersController;