const express = require('express')
const customersModel = require ('../models/customer')
const router = express.Router()


router.post('/post-customers',async(req,res)=>{
    try {
        const {name,email,phone,address} = req.body
        if (!name || !phone || !email || !address){
            return res.status(400).json({message: "all fields are required"})
        }
        const newData = await customersModel.create({name,email,phone,address})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get-customers', async (req, res) => {
    try {
        const data = await customersModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put-customers/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await customersModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-customers/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await customersModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "customers not found" });
        }
        res.status(200).json({ message: "customers deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});




module.exports = router