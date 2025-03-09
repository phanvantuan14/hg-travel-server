module.exports = app => {
    var router = require('express').Router();
    const moment = require('moment');
    const querystring = require('qs');
    const crypto = require("crypto");

    // Hàm sắp xếp object theo key
    function sortObject(obj) {
        let sorted = {};
        let str = [];
        let key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
        }
        return sorted;
    }

    router.post('/create_payment_url', function (req, res, next) {
        try {
            const ipAddr = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;

            // Sử dụng process.env thay vì config.get
            const tmnCode = process.env.VNP_TMN_CODE;
            const secretKey = process.env.VNP_HASH_SECRET;
            const vnpUrl = process.env.VNP_URL;
            const returnUrl = process.env.VNP_RETURN_URL;

            const date = new Date();
            const createDate = moment(date).format('YYYYMMDDHHmmss');
            const orderId = moment(date).format('HHmmss');

            const amount = req.body.amount;
            const orderInfo = req.body.orderInfo;
            const orderType = req.body.orderType || 'other';
            const locale = req.body.language || 'vn';

            // Tạo params ban đầu
            let vnp_Params = {
                vnp_Version: '2.1.0',
                vnp_Command: 'pay',
                vnp_TmnCode: tmnCode,
                vnp_Locale: locale,
                vnp_CurrCode: 'VND',
                vnp_TxnRef: orderId,
                vnp_OrderInfo: orderInfo,
                vnp_OrderType: orderType,
                vnp_Amount: amount * 100,
                vnp_ReturnUrl: returnUrl,
                vnp_IpAddr: ipAddr,
                vnp_CreateDate: createDate
            };

            // Sắp xếp các tham số theo alphabet
            vnp_Params = sortObject(vnp_Params);

            // Tạo chuỗi ký tự cần ký
            const signData = querystring.stringify(vnp_Params, { encode: false });
            
            // Tạo chữ ký
            const hmac = crypto.createHmac("sha512", secretKey);
            const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
            
            // Thêm chữ ký vào params
            vnp_Params['vnp_SecureHash'] = signed;

            // Tạo URL thanh toán
            const finalUrl = vnpUrl + '?' + querystring.stringify(vnp_Params, { encode: false });

            // Log để debug
            console.log("Payment Params:", vnp_Params);
            console.log("Payment URL:", finalUrl);

            // Trả về URL thanh toán
            return res.status(200).json({ url: finalUrl });

        } catch (error) {
            console.error('Create Payment Error:', error);
            return res.status(500).json({
                error: 'Không thể tạo URL thanh toán',
                message: error.message
            });
        }
    });

    router.get('/vnpay_return', function (req, res, next) {
        try {
            let vnp_Params = req.query;
            const secureHash = vnp_Params['vnp_SecureHash'];
            // Sử dụng process.env
            const secretKey = process.env.VNP_HASH_SECRET;

            // Xóa các tham số không cần thiết
            delete vnp_Params['vnp_SecureHash'];
            delete vnp_Params['vnp_SecureHashType'];

            // Sắp xếp lại các tham số
            vnp_Params = sortObject(vnp_Params);

            // Tạo chuỗi ký tự để kiểm tra
            const signData = querystring.stringify(vnp_Params, { encode: false });
            const hmac = crypto.createHmac("sha512", secretKey);
            const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

            // Kiểm tra chữ ký
            if (secureHash === signed) {
                const responseCode = vnp_Params['vnp_ResponseCode'];
                // Trả về kết quả
                return res.status(200).json({
                    code: responseCode,
                    message: 'success'
                });
            } else {
                return res.status(200).json({
                    code: '97',
                    message: 'Failed checksum'
                });
            }
        } catch (error) {
            console.error('VNPay Return Error:', error);
            return res.status(500).json({
                code: '99',
                message: 'Internal server error'
            });
        }
    });

    app.use("/vnpay", router);
};