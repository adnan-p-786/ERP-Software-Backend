const express = require('express')
const racksModel = require ('../models/racks');
const { authenticateAdmin } = require('./auth');
const router = express.Router()



router.post('/post-racks',authenticateAdmin, async (req, res) => {
    try {
        if (req.body.name){
            const racks = new racksModel({
                name: req.body.name
            });
            const savedRacks = await racks.save();
            res.status(201).json(savedRacks);
        }
        else{
            return res.status(400).json("name must be required")
        }
        
    } catch (error) {
        res.status(400).json(error);
    }
});


router.get('/get-racks',authenticateAdmin, async (req, res) => {
    try {
        const data = await racksModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put-racks/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await racksModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-racks/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await racksModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "racks not found" });
        }
        res.status(200).json({ message: "racks deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router