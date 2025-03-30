var UserRole = require("../models").UserRole;
exports.create = (req, res) => {
    UserRole.create(req.body)
        .then((data) => {
            res.json({ data: data });
        })
        .catch((er) => {
            throw er;
        });
};
exports.findall = (req, res) => {
    UserRole.findAll()
        .then((data) => {
            res.json({ data: data });
        })
        .catch((er) => {
            throw er;
        });
};
exports.findone = (req, res) => {
    UserRole.findOne({ where: { userId: req.params.id } })
        .then((data) => {
            res.json({ data: data });
        })
        .catch((er) => {
            throw er;
        });
};
exports.delete = (req, res) => {
    UserRole.destroy({ where: { id: req.params.id } })
        .then((data) => {
            res.json({ data: data });
        })
        .catch((er) => {
            throw er;
        });
};

exports.update = async (req, res) => {
    try {
        const existingRole = await UserRole.findOne({
            where: { userId: req.params.id },
        });

        if (existingRole) {
            await UserRole.destroy({
                where: { userId: req.params.id },
            });
        }

        const newRole = await UserRole.create({
            userId: req.params.id,
            roleId: req.body.roleId,
        });

        res.json({ data: newRole });
    } catch (er) {
        res.status(500).json({ error: er.message });
    }
};

exports.addrole = (req, res) => {
    UserRoleRole.create(req.body)
        .then((data) => {
            res.json({ data: data });
        })
        .catch((er) => {
            throw er;
        });
};
