import express, { Application, Router } from 'express';
import bodyParser from 'body-parser';
import foodTypesRoute from './routes/foodTypesRoute';
import beersRoute from './routes/beersRoute';
import usersRoute from './routes/usersRoute';
import pool from './dbconfig/dbconnector';
import {postgraphile} from "postgraphile";

class Server {
    private app;

    constructor() {
        require('dotenv').config();

        this.app = express();

        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        this.config();
        this.routerConfig();
        //this.dbConnect();

        this.app.use(postgraphile(
            process.env.LOCAL_CON,
            "public", 
            {
                watchPg: true,
                graphiql: true,
                enhanceGraphiql: true,
            }
        ));
    }

    private config() {
        this.app.use(bodyParser.urlencoded({ extended:true }));
        this.app.use(bodyParser.json({ limit: '1mb' }));
    }

    private dbConnect() {
        pool.connect( (err, client, done) => {
            if (err) throw new Error(err.message);
            console.log('Connected');
          }); 
    }

    private routerConfig() {
        this.app.use('/foodTypes', foodTypesRoute);
        this.app.use('/beers', beersRoute);
        this.app.use('/users', usersRoute);
    }

    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve(port);
            }).on('error', (err: Object) => reject(err));
        });
    }
}

export default Server;