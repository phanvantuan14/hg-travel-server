var Hoadon = require('../models').Hoadon;
var Tour = require("../models").Tour;
var User = require("../models").User;
exports.create = async (req, res) => {
    try {
        const hoadon = await Hoadon.create(req.body);
        // Lấy thêm thông tin tour và user
        const hoadonWithDetails = await Hoadon.findOne({
            where: { id: hoadon.id },
            include: [
                { 
                    model: Tour, 
                    attributes: ["id", "gianguoilon", "giatreem", "giaembe", "name"] 
                },
                { 
                    model: User, 
                    attributes: ["id", "name"] 
                }
            ]
        });
        res.json({ data: hoadonWithDetails });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};
exports.findall = (req, res) => {
    Hoadon.findAll({ order: [["id", "DESC"]], include: [{ model: Tour, attributes: ["id", "gianguoilon", "giatreem", "giaembe", "name", "thoigian", "avatar", "status"] }, { model: User, attributes: ["id", "name"] }] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.findone = (req, res) => {
    Hoadon.findOne({ attributes: ["id", "tourId", "userId", "thanhtien", "nguoilon", "treem", "embe", "ngaydi"], where: { id: req.params.id }, include: [{ model: Tour, attributes: ["id", "gianguoilon", "giatreem", "giaembe", "name"] }, { model: User, attributes: ["id", "name"] }] }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.delete = (req, res) => {
    Hoadon.destroy({ where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
exports.update = (req, res) => {
    Hoadon.update(req.body, { where: { id: req.params.id } }).then(data => {
        res.json({ data: data })
    }).catch(er => {
        throw er;
    })
}
