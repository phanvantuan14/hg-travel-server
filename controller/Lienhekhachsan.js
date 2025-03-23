var Lienhekhachsan = require("../models").Lienhekhachsan;
var Hotel = require("../models").Hotel;
const { sendEmail } = require("./SendEmail");

exports.create = async (req, res) => {
    try {
        // Lấy thông tin khách sạn trước
        const hotel = await Hotel.findByPk(req.body.hotelId);

        if (!hotel) {
            throw new Error("Không tìm thấy thông tin khách sạn");
        }

        if (!hotel.email) {
            throw new Error(
                `Khách sạn ${hotel.name} chưa cập nhật email để nhận thông báo`
            );
        }
        // Tạo liên hệ mới
        const contactData = await Lienhekhachsan.create(req.body);

        // Tạo nội dung email cho chủ khách sạn
        const htmlContent = `
            <h2>Thông báo: Có yêu cầu liên hệ mới</h2>
            <p>Kính gửi: <strong>${hotel.name}</strong></p>
            <p>Có một yêu cầu liên hệ mới từ khách hàng với thông tin như sau:</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
                <p><strong>Họ tên khách hàng:</strong> ${contactData.name}</p>
                <p><strong>Email khách hàng:</strong> ${contactData.email}</p>
                <p><strong>Địa chỉ:</strong> ${contactData.address}</p>
                <p><strong>Nội dung yêu cầu:</strong> ${contactData.message}</p>
                <p><strong>Thời gian gửi:</strong> ${new Date().toLocaleString(
                    "vi-VN"
                )}</p>
            </div>
            <p>Vui lòng đăng nhập vào hệ thống để xử lý yêu cầu này.</p>
            <p>Trân trọng,</p>
            <p>Website Du lịch</p>
        `;

        // Gửi email cho chủ khách sạn
        const emailResult = await sendEmail(
            hotel.email,
            `[${hotel.name}] Có yêu cầu liên hệ mới từ khách hàng`,
            htmlContent
        );

        res.json({
            success: true,
            data: contactData,
            emailSent: emailResult.success,
            message: emailResult.success
                ? `Đã gửi thông báo đến email của khách sạn: ${hotel.email}`
                : "Đã lưu yêu cầu liên hệ nhưng không gửi được email thông báo",
        });
    } catch (err) {
        console.error("Error processing contact:", err);
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

exports.findall = (req, res) => {
    Lienhekhachsan.findAll({
        order: [["id", "DESC"]],
        include: [
            {
                model: Hotel,
                attributes: ["id", "name"],
            },
        ],
    })
        .then((data) => {
            res.json({ data: data });
        })
        .catch((err) => {
            res.status(500).json({
                error: err.message,
            });
        });
};

// Thêm hàm update status
exports.updateStatus = (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    Lienhekhachsan.update(
        { status: status },
        {
            where: { id: id },
            returning: true, // Để trả về data sau khi update
        }
    )
        .then(async () => {
            // Lấy data mới sau khi update
            const updatedData = await Lienhekhachsan.findOne({
                where: { id: id },
                include: [
                    {
                        model: Hotel,
                        attributes: ["id", "name"],
                    },
                ],
            });
            res.json({
                success: true,
                data: updatedData,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        });
};

// Thêm hàm delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Lienhekhachsan.destroy({
        where: { id: id },
    })
        .then(() => {
            res.json({
                success: true,
                message: "Đã xóa thành công!",
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        });
};
