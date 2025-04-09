const express = require('express')
const brandModel = require('../models/brand')
const router = express.Router()
const multer = require('multer')
const path = require('path');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload/images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const uploadImg = multer({ storage: storage });

router.post('/post-brand', uploadImg.single("logo"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Logo image is required" });
        }

        const image_url = `http://localhost:3000/api/images/${req.file.filename}`;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        const newData = await brandModel.create({
            name: name,
            logo: image_url,
        });

        res.status(201).json(newData);
    } catch (error) {
        console.error("Error posting brand:", error);
        res.status(500).json({ message: "Server error", error });
    }
});



module.exports = router