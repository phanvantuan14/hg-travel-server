var Anh = require('../models').Anh;
var Tour = require('../models').Tour;
var Hotel = require('../models').Hotel;

const controller = {
    // Tạo nhiều ảnh
    create: (req, res) => {
        Anh.bulkCreate(req.body)
            .then(data => {
                res.json({ data: data })
            }).catch(er => {
                throw er;
            })
    },

    // Lấy tất cả ảnh
    findall: (req, res) => {
        Anh.findAll({
            order: [["id", "DESC"]],
            include: [
                { model: Tour, attributes: ['name'] },
                { model: Hotel, attributes: ['name'] }
            ]
        }).then(data => {
            res.json({ data: data })
        }).catch(er => {
            throw er;
        })
    },

    // Lấy một ảnh theo id
    findone: (req, res) => {
        Anh.findOne({
            where: { id: req.params.id },
            include: [
                { model: Tour, attributes: ['name'] },
                { model: Hotel, attributes: ['name'] }
            ]
        }).then(data => {
            res.json({ data: data })
        }).catch(er => {
            throw er;
        })
    },

    // Xóa ảnh theo tourId hoặc hotelId
    delete: (req, res) => {
        const { type, id } = req.params; // type: 'tour' hoặc 'hotel'
        const whereCondition = type === 'tour' 
            ? { tourId: id }
            : { hotelId: id };

        Anh.destroy({ where: whereCondition })
            .then(data => {
                res.json({ data: data })
            }).catch(er => {
                throw er;
            })
    },

    // Cập nhật ảnh
    update: (req, res) => {
        Anh.update(req.body, {
            where: { id: req.params.id }
        }).then(data => {
            res.json({ data: data })
        }).catch(er => {
            throw er;
        })
    },

    // Lấy ảnh theo tour
    findByTour: (req, res) => {
        Anh.findAll({
            where: { tourId: req.params.tourId },
            include: [{ model: Tour, attributes: ['name'] }]
        }).then(data => {
            res.json({ data: data })
        }).catch(er => {
            throw er;
        })
    },

    // Lấy ảnh theo hotel
    findByHotel: (req, res) => {
        Anh.findAll({
            where: { hotelId: req.params.hotelId },
            include: [{ model: Hotel, attributes: ['name'] }]
        }).then(data => {
            res.json({ data: data })
        }).catch(er => {
            throw er;
        })
    }
};

module.exports = controller;
