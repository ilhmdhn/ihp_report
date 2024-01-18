require('dotenv').config({path: path.join(__dirname, '.env')});
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const sqlz = require('./src/tools/database');

const response = require('./src/tools/response');

const port = process.env.APP_PORT;

const reportRoute = require('./src/router/report-route');

app.get('/', async(req, res)=>{
    try {
        await sqlz.authenticate();
        res.json(response(true, 'running'))
    } catch (err) {
        console.log(`
        /    
        name: ${err.name}
        message: ${err.message}
        stack: ${err.stack}
        `);
        res.statusCode(500).json(response(false, err.name))
    }
});

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader;
    if (!token) return res.sendStatus(401)

    if (token == process.env.SECRET_KEY){
        next()
    }else{
        return res.sendStatus(401)
    }
}

app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.urlencoded({extended:false}));
app.use(verifyToken)

app.use(reportRoute)