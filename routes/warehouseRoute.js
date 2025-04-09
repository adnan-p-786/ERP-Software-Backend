const express = require('express')
const warehouseModel = require ('../models/warehouse')
const router = express.Router()


router.post('/post-warehouse', async (req, res) => {
    try {
        const { name,phone,email,storeId,LocationId } = req.body
        if (!name || !phone || !email    ||  !storeId   || !LocationId) {
            return res.status(400).json({ message: "all fields are required" })
        }
        const newData = await warehouseModel.create({  name,phone,email,storeId,LocationId  })
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
});


router.get('/get-warehouse', async (req, res) => {
    try {
        const data = await warehouseModel.find()
        .populate('storeId')
        .populate('locationId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put-warehouse/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await warehouseModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-warehouse/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteData = await warehouseModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "warehouse not found" });
        }
        res.status(200).json({ message: "warehouse deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router