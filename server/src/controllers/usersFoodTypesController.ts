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

        const deletePrevQuery = gql`
        mutation deleteusersfoodtypebyemail($email: String!) {
          deleteusersfoodtypebyemail(input: {
            email: $email}){
            userByEmail{
              email
            }
          }
        }`;

        try {
          await request(String(process.env.GRAPHQL), deletePrevQuery,{email: req.body.email},).then(()=>{
            for(let type of req.body.foodTypes){
              request(String(process.env.GRAPHQL), createUsersFoodTypesQuery,{email: req.body.email,id: type});
            }
          }); 
          
        } catch (error) {
          res.status(error.response.status).send(error.message);
        }
    }
}

export default UsersFoodTypesController;