const router = require('express').Router();
const { throwError } = require('../server');

router.post('/add', (req, res) => {
    const orders = req.body;
    orders.map(order => {
        let sql = "INSERT INTO orders(productId, price, amount, total, date) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP())";
        db.query(sql, [order.productId, order.price, order.amount, order.total],
            (err, result) => {
            throwError(err);
            let sql = "UPDATE productlist SET stock = ? WHERE id = ?";
            db.query(sql, [order.stock, order.productId],
                (err, result) => {
                throwError(err);
            });
        });
    })
    res.send({});
});

router.get('/', (req, res) => {
    let sql = "SELECT o.*, p.name FROM orders AS o, productlist AS p WHERE p.id = o.productId";
    db.query(sql, (err, result) => {
        throwError(err);
        res.send(result);
    });
});

router.get('/total', (req, res) => {
    let sql = "SELECT SUM(retailPrice * amount) AS 'cost', SUM(amount) AS 'amount', SUM(total) AS 'income' FROM orders";
    db.query(sql, [req.params.id], (err, result) => {
        throwError(err);
        res.send(result);
    });
});

router.get('/:id', (req, res) => {
    let sql = "SELECT * FROM orders WHERE productId = ?";
    db.query(sql, [req.params.id], (err, result) => {
        throwError(err);
        res.send(result);
    });
});

module.exports = router;