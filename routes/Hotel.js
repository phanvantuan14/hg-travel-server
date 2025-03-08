module.exports = app => {
    const Hotel = require('../controller/Hotel');
    const router = require('express').Router();

    // Các route cơ bản
    router.get('/', Hotel.findall);
    router.get('/:id', Hotel.findone);
    router.post("/", Hotel.create);
    router.patch('/:id', Hotel.update);
    router.delete('/:id', Hotel.delete);

    // Base URL
    app.use("/hotels", router);
}