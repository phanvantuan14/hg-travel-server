module.exports = app => {
    const lienhekhachsan = require('../controller/Lienhekhachsan');
    const router = require('express').Router();

    router.post("/", lienhekhachsan.create);
    router.get("/", lienhekhachsan.findall);
    router.delete("/:id", lienhekhachsan.delete);
    router.patch("/:id", lienhekhachsan.updateStatus);

    app.use("/lienhekhachsan", router);
};