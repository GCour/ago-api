const router = require('express').Router();
const { throwError } = require('../server');

router.get('/', (req, res) => {
    let sql = "SELECT * FROM productlist";
    db.query(sql, (err, result) => {
        throwError(err);
        res.send(result);
    });
});

router.get('/:id', (req, res) => {
    let sql = "SELECT * FROM productlist WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        throwError(err);
        res.send(result);
    });
});


router.post('/add', (req, res) => {
    let sql = "INSERT INTO productlist(name, price, stock, visible, category, unity) VALUES (?, ?, ?, ?, ?, ?)";
    const product = req.body;
    db.query(sql, [product.name, product.price, product.stock, product.visible, product.category, product.unity],
        (err, result) => {
        throwError(err);
        res.send(result);
    });
});

router.post('/edit/:id', (req, res) => {
    let sql = "UPDATE productlist SET name = ?, price = ?, visible = ?, category = ?, unity = ? WHERE id = ?";
    const product = req.body;
    db.query(sql, [product.name, product.price, product.visible, product.category, product.unity, req.params.id], (err, result) => {
        throwError(err);
        res.send(result);
    });
});

module.exports = router