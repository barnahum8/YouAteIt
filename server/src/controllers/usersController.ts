import pool from '../dbconfig/dbconnector';
import FoodTypesController from './FoodTypesController';
import usersFoodTypesController from './usersFoodTypesController';
const foodTypeController = new FoodTypesController();
const usersFoodTypeController = new usersFoodTypesController();
import { gql, request } from "graphql-request";

class usersController {

  // adds new user to db, updates user detail if already exists
    public async addUser(req, res) {
      const createUserQuery = gql`
      mutation createUser ($email: String!
        $firstname: String!
        $lastname: String!
        $birthdate: String!
        $beer: Int
        $id: String!
        $phone: String!) {
                createUser(
                  input: { 
                    user: { 
                      email: $email
                      firstname:$firstname
                      lastname:$lastname
                      birthdate:$birthdate
                      beer:$beer
                      id:$id
                        phone:$phone 
                    } 
                  }
                ) {
                user {
                  email
                  firstname
                  lastname
                  birthdate
                  beer
                  id
                  phone
                }
              }
        }`;

        const deleteUserQuery = gql`
          mutation deleteUserByEmail ($email: String!) {
              deleteUserByEmail(
                  input: { 
                      email: $email 
                  }
              ) {
                  user {
                      email
                  }
              }
          }`;

        try {
            // await request(String(process.env.GRAPHQL), deleteUserQuery,{
            //   email: req.body.email,
            // });

            const user = await request(String(process.env.GRAPHQL), createUserQuery,{
              email: req.body.email,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              birthdate: req.body.birthdate,
              beer: req.body.beer ? parseInt(req.body.beer) : null,
              id: req.body.id,
              phone: req.body.phone
            });

            if(req.body.newType){
              foodTypeController.addType(req,res);
            }

            usersFoodTypeController.addUsersFoodTypes(req,res);

            res.send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default usersController;