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
exports.update = (req, res) => {
    UserRole.update(req.body, { where: { id: req.params.id } })
        .then((data) => {
            // Thêm bước kiểm tra và trả về dữ liệu đã cập nhật
            if (data[0] === 0) {
                // Nếu không tìm thấy record để update
                return UserRole.create({
                    userId: req.params.id,
                    roleId: req.body.roleId,
                });
            }
            return UserRole.findOne({ where: { userId: req.params.id } });
        })
        .then((updatedData) => {
            res.json({ data: updatedData });
        })
        .catch((er) => {
            res.status(500).json({ error: er.message });
        });
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
