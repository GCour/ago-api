const router = require('express').Router();
const { throwError } = require('../server');

router.post('/add', (req, res) => {
    let sql = "INSERT INTO purchases(productId, date, price, retailPrice, amount, cost) VALUES (?, CURRENT_TIMESTAMP(), ?, ?, ?, ?)";
    const purchase = req.body;
    db.query(sql, [purchase.productId, purchase.price, purchase.retailPrice, purchase.amount, purchase.cost],
        (err, result) => {
        throwError(err);
        let sql = "UPDATE productlist SET stock = ? WHERE id = ?";
        db.query(sql, [purchase.stock, purchase.productId],
            (err, result) => {
            throwError(err);
            res.send(result);
        });
    });
});

module.exports = router;