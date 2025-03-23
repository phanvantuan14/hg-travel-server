module.exports = (app) => {
    const resetPassword = require("../controller/resetPassword");
    const router = require("express").Router();

    router.post("/forgot-password", resetPassword.forgotPassword);
    router.post("/reset-password", resetPassword.resetPassword);

    app.use("/reset", router);
};
