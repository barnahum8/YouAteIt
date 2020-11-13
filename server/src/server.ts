import express, { Application, Router } from 'express';
import bodyParser from 'body-parser';
import foodTypesRoute from './routes/foodTypesRoute';
import beersRoute from './routes/beersRoute';
import pool from './dbconfig/dbconnector';

class Server {
    private app;

    constructor() {
        this.app = express();

        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        this.config();
        this.routerConfig();
        this.dbConnect();
    }

    private config() {
        this.app.use(bodyParser.urlencoded({ extended:true }));
        this.app.use(bodyParser.json({ limit: '1mb' }));
    }

    private dbConnect() {
        pool.connect(function (err, client, done) {
            if (err) throw new Error(err);
            console.log('Connected');
          }); 
    }

    private routerConfig() {
        this.app.use('/foodTypes', foodTypesRoute);
        this.app.use('/beers', beersRoute);
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