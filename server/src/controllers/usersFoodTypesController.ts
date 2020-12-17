import pool from '../dbconfig/dbconnector';
var format = require('pg-format');
import { gql, request } from "graphql-request";

class UsersFoodTypesController {

  // adds the user food types, deletes old types if exists
    public async addUsersFoodTypes(req, res) {
        
      const createUsersFoodTypesQuery = gql`
          mutation createUsersFoodType ($email: String!,$id: Int!) {
            createUsersfoodtype(
                input: { 
                    usersfoodtype: { 
                        email: $email,
                        id:$id
                    } 
                }
            ) {
                usersfoodtype {
                    email
                    id
                }
            }
        }`;
        try {
          let UsersFoodTypes;
          for(let type of req.body.foodTypes){
            UsersFoodTypes = await request(String(process.env.GRAPHQL), createUsersFoodTypesQuery,{email: req.body.email,id: type});
          }
          res.send(UsersFoodTypes);
        } catch (error) {
            res.status(400).send(error);
        }
        // try {
        //     const client = await pool.connect();

        //     const deletesql = 'DELETE FROM usersFoodTypes WHERE email = $1';
        //     const email = [req.body.email]

        //     await client.query(deletesql,email,(err, res) => {
        //       if (err) {
        //         console.log(err.stack)
        //       } else {
        //         const values =[];

        //         for(let type of req.body.foodTypes){
        //             values.push([req.body.email,type]);
        //         }

        //         const sql = format('INSERT INTO usersFoodTypes (email,id) VALUES %L',values); 

        //         client.query(sql,(err, res) => {
        //             if (err) {
        //               console.log(err.stack)
        //             }
        //           })
        //       }
        //     })

        //     client.release();

        // } catch (error) {
        //     res.status(400).send(error);
        // }
    }
}

export default UsersFoodTypesController;