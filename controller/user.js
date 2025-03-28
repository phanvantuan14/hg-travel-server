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
        .catch((error) => {
            res.status(500).json({
                message: "Error retrieving users",
                error: error.message,
            });
        });
};
exports.findone = (req, res) => {
    User.findOne({ where: { id: req.params.id }, include: [Role] })
        .then((data) => {
            if (!data) {
                return res.status(404).json({
                    message: `User with id ${req.params.id} not found`,
                });
            }
            res.json({ data: data });
        })
        .catch((error) => {
            res.status(500).json({
                message: `Error retrieving user with id ${req.params.id}`,
                error: error.message,
            });
        });
};
exports.delete = (req, res) => {
    User.destroy({ where: { id: req.params.id } })
        .then((num) => {
            if (num === 1) {
                res.json({ message: "User was deleted successfully" });
            } else {
                res.status(404).json({
                    message: `Cannot delete User with id=${req.params.id}. Maybe User was not found!`,
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: `Could not delete User with id=${req.params.id}`,
                error: error.message,
            });
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
