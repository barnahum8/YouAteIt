import pool from '../dbconfig/dbconnector';
import { gql, request } from "graphql-request";

class BeersController {

    // gets all beer types from db
    public async get(req, res) {
        const getBeersQuery = gql`
        query getBeers {
            allBeers {
                nodes {
                  id
                  name
                }
            }
        }`;
        
        try {
            const beers = await request(String(process.env.GRAPHQL), getBeersQuery)
            res.send(beers.allBeers.nodes);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default BeersController;