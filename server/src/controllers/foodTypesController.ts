import pool from '../dbconfig/dbconnector';
import { gql, request } from "graphql-request";


class FoodTypesController {

    // gets all food types from db
    public async get(req, res) {
        const getFoodTypesQuery = gql`
        query getFoodTypes {
            allFoodtypes {
                nodes {
                  id
                  name
                }
            }
        }`;
        try {
            const foodTypes = await request(String(process.env.GRAPHQL), getFoodTypesQuery)
            res.send(foodTypes.allFoodtypes.nodes);
        } catch (error) {
            res.status(error.response.status).send(error.message);
        }
    }

    // adds new type to the db
    public async addType(req,res){
        const createFoodTypesQuery = gql`
        mutation createFoodType ($foodTypeName: String!) {
            createFoodtype(
                input: { 
                    foodtype: { 
                        name: $foodTypeName 
                    } 
                }
            ) {
                foodtype {
                    name
                    id
                }
            }
        }`;
        try {
            await request(String(process.env.GRAPHQL), createFoodTypesQuery,{foodTypeName:req.body.newType})
        } catch (error) {
            res.status(error.response.status).send(error.message);
        }
    }
}

export default FoodTypesController;