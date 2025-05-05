const express = require('express')
const locationModel = require ('../models/location');
const { authenticateAdmin } = require('./auth');
const router = express.Router()


router.post('/post-location',authenticateAdmin, async (req, res) => {
    try {
        const { address, country , state , city, zipcode ,warehouseId } = req.body
        if (!address || !country || !state    ||  !city   || !zipcode   || !warehouseId) {
            return res.status(400).json({ message: "all fields are required" })
        }
        const newData = await locationModel.create({ address, country , state , city, zipcode ,warehouseId  })
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
});


router.get('/get-location',authenticateAdmin, async (req, res) => {
    try {
        const data = await locationModel.find()
        .populate('warehouseId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put-location/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await locationModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-location/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteData = await locationModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "location not found" });
        }
        res.status(200).json({ message: "location deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router