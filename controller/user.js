var User = require("../models").User;
var Role = require("../models").Role;
var UserRole = require("../models").UserRole;

exports.create = async (req, res) => {
    try {
        const userRole = await Role.findOne({ where: { name: "user" } });

        if (!userRole) {
            return res.status(500).json({
                success: false,
                message: "Không tìm thấy role user trong hệ thống",
            });
        }

        const userData = {
            ...req.body,
            UserRoles: [
                {
                    roleId: userRole.id,
                },
            ],
        };

        const newUser = await User.create(userData, {
            include: [UserRole],
        });

        res.json({
            success: true,
            data: newUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.findall = (req, res) => {
    User.findAll({
        attributes: [
            "id",
            "name",
            "gioitinh",
            "email",
            "avatar",
            "diachi",
            "sdt",
            "ngaysinh",
            "status",
        ],
        order: [["id", "DESC"]],
        include: [Role, UserRole],
    })
        .then((data) => {
            res.json({ data: data });
        })
        .catch((er) => {
            throw er;
        });
};
exports.findone = (req, res) => {
    User.findOne({ where: { id: req.params.id }, include: [Role] })
        .then((data) => {
            res.json({ data: data });
        })
        .catch((er) => {
            throw er;
        });
};
exports.delete = (req, res) => {
    User.destroy({ where: { id: req.params.id } })
        .then((data) => {
            res.json({ data: data });
        })
        .catch((er) => {
            throw er;
        });
};
exports.update = (req, res) => {
    User.update(req.body, { where: { id: req.params.id } })
        .then((data) => {
            res.json({ data: data });
        })
        .catch((er) => {
            throw er;
        });
};
exports.checkemail = (req, res) => {
    User.findOne({ where: { email: req.params.email } })
        .then((data) => {
            console.log(req.params.email);
            res.json({ data: data });
        })
        .catch((er) => {
            throw er;
        });
};
