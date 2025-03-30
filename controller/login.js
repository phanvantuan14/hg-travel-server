require("dotenv").config();
const User = require("../models").User;
const jwt = require("jsonwebtoken");
const Role = require("../models").Role;
const bcrypt = require("bcrypt");

// exports.login = (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     User.findAll({
//         where: { email: email, password: password },
//         include: [Role],
//     })
//         .then((data) => {
//             if (data[0] !== undefined) {
//                 var user = {
//                     id: data[0].id,
//                     role: data[0].Roles[0].name,
//                     mota: data[0].Roles[0].mota,
//                 };
//                 var token = jwt.sign(
//                     { user },
//                     process.env.ACCESS_TOKEN_SECRET,
//                     { algorithm: "HS256", expiresIn: "3h" }
//                 );
//                 res.json(token);
//             } else {
//                 res.json("err");
//             }
//         })
//         .catch((err) => {
//             res.json({ err: err.message });
//         });
// };

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
            include: [Role],
        });

        if (!user) {
            return res.status(401).json("err");
        }

        // Compare password with hashed password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json("err");
        }

        // Create token payload
        const tokenPayload = {
            user: {
                id: user.id,
                role: user.Roles[0].name,
                mota: user.Roles[0].mota,
            },
        };

        // Generate JWT token
        const token = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: "5h",
        });

        res.json(token);
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ err: err.message });
    }
};
