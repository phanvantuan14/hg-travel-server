module.exports = app => {
    const Anh = require('../controller/Anh');
    const router = require('express').Router();

    // Routes cơ bản
    router.get('/', Anh.findall);
    router.get('/:id', Anh.findone);
    router.post('/', Anh.create);
    router.patch('/:id', Anh.update);
    
    // Routes cho tour và hotel
    router.delete('/:type/:id', Anh.delete);  // type: 'tour' hoặc 'hotel'
    router.get('/tour/:tourId', Anh.findByTour);
    router.get('/hotel/:hotelId', Anh.findByHotel);

    app.use('/anhs', router);
}