const express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    res.render('search/index');
});

module.exports = router;