require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("<h1>Backend is running</h1>");
});

require("./routes/login")(app);
require("./routes/user")(app);
require("./routes/Tag")(app);
require("./routes/Quocgia")(app);
require("./routes/Tintuc")(app);
require("./routes/Hotel")(app);
require("./routes/Tour")(app);
require("./routes/Ngaydi")(app);
require("./routes/Loaitour")(app);
require("./routes/Mangxahoi")(app);
require("./routes/Diadiem")(app);
require("./routes/Binhluan")(app);
require("./routes/Anh")(app);
require("./routes/Dichvu")(app);
require("./routes/Hoadon")(app);
require("./routes/TintucTag")(app);
require("./routes/Role")(app);
require("./routes/Lienhe")(app);
require("./routes/Camnangdulich")(app);
require("./routes/UserRole")(app);
require("./routes/Checkuser")(app);
require("./routes/checkemail")(app);
require("./routes/DichvuTour")(app);
require("./routes/TourLoaitour")(app);
require("./routes/TourNgaydi")(app);
require("./routes/TourDiaidem")(app);
require("./routes/Chitieu")(app);
require("./routes/Khuyenmai")(app);
require("./routes/TourKhuyenmai")(app);
require("./routes/VnPayment")(app);
require("./routes/Chiphi")(app);
require("./routes/Thongbao")(app);
require("./routes/SendEmail")(app);
require("./routes/Lienhekhachsan")(app);

app.use(function (err, req, res, next) {
    res.status(500).send(err);
});
app.listen(process.env.PORT || 666, () => {
    console.log("Backend is running.....");
});
