import pool from '../dbconfig/dbconnector';
import FoodTypesController from './foodTypesController';
import UsersFoodTypesController from './usersFoodTypesController';
const foodTypeController = new FoodTypesController();
const usersFoodTypeController = new UsersFoodTypesController();
import { gql, request } from "graphql-request";

class usersController {

  // adds new user to db, updates user detail if already exists
    public async addUser(req, res) {
      const createUserQuery = gql`
      mutation createOrUpdateUser ($email: String!
        $firstname: String!
        $lastname: String!
        $birthdate: String!
        $beer: Int
        $id: String!
        $phone: String!){
        createorupdateuser(
          input: {
              useremail: $email
              userfirstname: $firstname
              userlastname: $lastname
              userbirthdate: $birthdate
              userbeer: $beer
              userid:$id
              userphone:$phone
          }){
            user{
              email
            }
          }
      }`

      try {
          const user = await request(String(process.env.GRAPHQL), createUserQuery,{
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthdate: req.body.birthdate,
            beer: req.body.beer ? parseInt(req.body.beer) : null,
            id: req.body.id,
            phone: req.body.phone
          }).then(()=>{
            if(req.body.newType){
              foodTypeController.addType(req,res);
            }
  
            usersFoodTypeController.addUsersFoodTypes(req,res).then(() => {
              res.send(user);
            });
          });
          
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default usersController;