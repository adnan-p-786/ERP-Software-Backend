const express = require('express')
const subCategoriesModel = require('../models/subCategories')
const router = express.Router()


router.post('/post-subCategories', async (req, res) => {
    try {
        const { name,categoriesId } = req.body
        if (!name || !categoriesId) {
            return res.status(400).json({ message: "all fields are required" })
        }
        const newData = await subCategoriesModel.create({ name,categoriesId  })
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
});


router.get('/get-subCategories', async (req, res) => {
    try {
        const data = await subCategoriesModel.find()
        .populate('categoriesId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put-subCategories/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await subCategoriesModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-subCategories/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteData = await subCategoriesModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "racks not found" });
        }
        res.status(200).json({ message: "racks deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router