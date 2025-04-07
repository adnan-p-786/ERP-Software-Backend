const express = require('express')
const departmentsModel = require('../models/departments')
const router = express.Router()

router.post('/post-department', async (req, res) => {
    try {
        const department = new departmentsModel({
            name: req.body.name
        });
        const savedDepartment = await department.save();
        res.status(201).json(savedDepartment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.get('/get-department', async (req, res) => {
    try {
        const data = await departmentsModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put-department/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await departmentsModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-department/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await departmentsModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "department not found" });
        }
        res.status(200).json({ message: "department deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});




module.exports = router