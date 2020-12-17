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

    private getFoodTypesQuery(){
        return gql`
            query getFoodTypes {
                __typename
                foodTypes {
                    nodes {
                        name
                        id
                    }
                }
            }`;
    }
}

export default FoodTypesController;