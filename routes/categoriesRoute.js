const express = require('express')
const categoriesModel = require ('../models/categories');
const { authenticateAdmin } = require('./auth');
const router = express.Router()



router.post('/post-categories',authenticateAdmin,async (req, res) => {
    try {
        if(req.body.name){

            const racks = new categoriesModel({
                name: req.body.name
            });
            const savedRacks = await racks.save();
            return res.status(201).json(savedRacks);
        }else{
            return res.status(400).json("name must be required")
        }
    } catch (error) {
        res.status(400).json(error);
    }
});


router.get('/get-categories',authenticateAdmin, async (req, res) => {
    try {
        const data = await categoriesModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put-categories/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await categoriesModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-categories/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await categoriesModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "categories not found" });
        }
        res.status(200).json({ message: "categories deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});









module.exports = router