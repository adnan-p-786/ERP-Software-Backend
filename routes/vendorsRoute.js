const express = require('express')
const vendorsModel = require ('../models/vendors')
const router = express.Router()


router.post('/post-vendors',async(req,res)=>{
    try {
        const {name,email,phone,address,vatNo} = req.body
        if (!name || !phone || !email || !address || !vatNo){
            return res.status(400).json({message: "all fields are required"})
        }
        const newData = await vendorsModel.create({name,email,phone,address,vatNo})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get-vendors', async (req, res) => {
    try {
        const data = await vendorsModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put-vendors/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await vendorsModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-vendors/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await vendorsModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "vendors not found" });
        }
        res.status(200).json({ message: "vendors deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router