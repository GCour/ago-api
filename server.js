const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql');
var cors = require('cors');

let db;
const app = express();

app.listen((process.env.PORT || 5000), () => {
    console.log('STARTED');
});


app.use('/products', require('./routes/products'));
app.use('/orders', require('./routes/orders'));
app.use('/purchases', require('./routes/purchases'));
app.use('/inventory', require('./routes/inventory'));

app.use(bodyParser.json())

app.use(cors());


export function throwError(err) {
    if (err) {
        throw err;
    }
}

function handleDisconnect() {
    db = mysql.createConnection({
        // removed
    });

    db.connect((err) => {
        throwError(err);
        console.log('Database connected');
    });

    db.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();