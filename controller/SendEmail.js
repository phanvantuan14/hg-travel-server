const nodemailer = require("nodemailer");
require('dotenv').config();

// Chỉ export hàm sendEmail, bỏ API endpoint test
exports.sendEmail = async (toEmail, subject, htmlContent) => {
    try {
        if (!toEmail) {
            throw new Error("Email người nhận không được để trống");
        }

        console.log("Sending notification to hotel email:", toEmail);

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORDEMAIL
            }
        });

        let mailOptions = {
            from: `"Website Du Lịch" <${process.env.EMAIL}>`,
            to: toEmail,
            subject: subject,
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to hotel:', toEmail);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: error.message };
    }
};