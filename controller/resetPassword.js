const User = require("../models").User;
const { sendEmail } = require("./SendEmail");
const crypto = require("crypto");
const { Op } = require("sequelize");

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res
                .status(404)
                .json({ message: "Email không tồn tại trong hệ thống" });
        }

        // Tạo reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = Date.now() + 3600000; // Token hết hạn sau 1 giờ

        // Lưu token vào database
        await User.update(
            {
                resetPasswordToken: resetToken,
                resetPasswordExpires: resetTokenExpiry,
            },
            {
                where: { id: user.id },
            }
        );

        // Gửi email
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        const htmlContent = `
            <h2>Yêu cầu đặt lại mật khẩu</h2>
            <p>Để đặt lại mật khẩu, vui lòng click vào link bên dưới:</p>
            <a href="${resetUrl}">Đặt lại mật khẩu</a>
            <p>Link này sẽ hết hạn sau 1 giờ.</p>
        `;

        await sendEmail(email, "Đặt lại mật khẩu", htmlContent);
        res.json({ message: "Email đặt lại mật khẩu đã được gửi" });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ message: "Có lỗi xảy ra khi xử lý yêu cầu" });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            return res
                .status(400)
                .json({ message: "Token và mật khẩu mới không được để trống" });
        }

        const user = await User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: {
                    [Op.gt]: Date.now(), // Sử dụng Op.gt thay vì $gt
                },
            },
        });

        if (!user) {
            return res
                .status(400)
                .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
        }

        // Cập nhật mật khẩu mới
        await User.update(
            {
                password: newPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            },
            {
                where: { id: user.id },
            }
        );

        res.json({ message: "Mật khẩu đã được cập nhật thành công" });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ message: "Có lỗi xảy ra khi đặt lại mật khẩu" });
    }
};
