var Hotel = require('../models').Hotel;
var Anh = require('../models').Anh;

const controller = {
    create: (req, res) => {
        Hotel.create(req.body, { 
            include: [Anh] // Tạo hotel và ảnh cùng lúc
        }).then(data => {
            res.json({ data: data })
        }).catch(er => {
            res.status(500).json({ error: er.message })
        })
    },

    findall: (req, res) => {
        Hotel.findAll({ 
            include: [Anh],
            order: [['id', 'DESC']] // Thêm sắp xếp theo ID mới nhất
        }).then(data => {
            res.json({ data: data })
        }).catch(er => {
            res.status(500).json({ error: er.message }) // Xử lý lỗi tốt hơn
        })
    },

    findone: (req, res) => {
        Hotel.findOne({ 
            where: { id: req.params.id },
            include: [Anh]
        }).then(data => {
            res.json({ data: data })
        }).catch(er => {
            throw er;
        })
    },

    delete: (req, res) => {
        Hotel.update(
            { status: 0 },
            { where: { id: req.params.id } }
        ).then(async () => {
            // Trả về kết quả sau khi xóa
            const deletedHotel = await Hotel.findOne({
                where: { id: req.params.id }
            });
            res.json({ data: deletedHotel })
        }).catch(er => {
            res.status(500).json({ error: er.message })
        })
    },

    update: (req, res) => {
        Hotel.update(req.body, {
            where: { id: req.params.id }
        }).then(async () => {
            // Trả về dữ liệu sau khi cập nhật
            const updatedHotel = await Hotel.findOne({
                where: { id: req.params.id },
                include: [Anh]
            });
            res.json({ data: updatedHotel })
        }).catch(er => {
            res.status(500).json({ error: er.message })
        })
    }
};

module.exports = controller;