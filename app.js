const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");

const app = express();
const docgiaRouter = require("./app/routes/docgia.route");
const nhanvienRouter = require("./app/routes/nhanvien.route");
const sachRouter = require("./app/routes/sach.route");
const nxbRouter = require("./app/routes/nxb.route");
const muonsachRouter = require("./app/routes/muonsach.route");


app.use(cors());
app.use(express.json());
app.use("/api/docgia", docgiaRouter);
app.use("/api/nhanvien", nhanvienRouter);
app.use("/api/sach", sachRouter);
app.use("/api/nxb", nxbRouter);
app.use("/api/muonsach", muonsachRouter);



app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

module.exports = app;