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



router.get('/get-brand', async (req, res) => {
    try {
        const data = await brandModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});



router.put('/put-brand/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await brandModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-brand/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await brandModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "brand not found" });
        }
        res.status(200).json({ message: "brand deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router