import express from "express";

const app = express();

app.use((err, req, res, next) => {
    console.log(error);

    const status = err.statusCode || 500;
    res.status(status).json({
        ok: false,
        message: err.message || "Internal Server Error"
    });
});