const router = require('express').Router();
const { throwError } = require('../server');

router.post('/add', (req, res) => {
    let sql = "INSERT INTO inventory(date, productId, retailPrice, stock) VALUES (CURRENT_TIMESTAMP(), ?, ?, ?)";
    const product = req.body;
    db.query(sql, [product.productId, product.retailPrice, product.stock, product.stock, product.productId],
        (err, result) => {
        throwError(err);
        let sql = "UPDATE productlist SET stock = stock + ? WHERE id = ?";
        db.query(sql, [product.stock, product.productId],
            (err, result) => {
            throwError(err);
            res.send(result);
        });
    });
});

router.get('/', (req, res) => {
    let sql = "SELECT * FROM inventory";
    db.query(sql, (err, result) => {
        throwError(err);
        res.send(result);
    });
});

router.get('/:id', (req, res) => {
    let sql = "SELECT * FROM inventory WHERE productId = ?";
    db.query(sql, [req.params.id], (err, result) => {
        throwError(err);
        res.send(result);
    });
});

router.post('/delete/:id', (req, res) => {
    let sql = "DELETE FROM inventory WHERE id = ?";
    const inventory = req.body;
    db.query(sql, [req.params.id], (err, result) => {
        throwError(err);
        let sql = "UPDATE productlist SET stock = stock - ? WHERE id = ?";
        db.query(sql, [inventory.stock, inventory.productId],
            (err, result) => {
            throwError(err);
            res.send(result);
        });
    });
})

module.exports = router;