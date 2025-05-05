const express = require('express')
const vendorsAccountModel = require ('../models/vendorsAccounts')
const { authenticateAdmin } = require('./auth')
const router = express.Router()


router.post('/post-vendorAccounts',authenticateAdmin,async(req,res)=>{
    try {
        const {type,debit,credit,vendorsId} = req.body
        if (!type || !debit || !credit || !vendorsId){
            return res.status(400).json({message: "all fields are required"})
        }
        const newData = await vendorsAccountModel.create({type,debit,credit,vendorsId})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get-vendorAccounts',authenticateAdmin, async (req, res) => {
    try {
        const data = await vendorsAccountModel.find()
        .populate('vendorsId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put-vendorAccounts/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await vendorsAccountModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-vendorAccounts/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await vendorsAccountModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "vendorAccount not found" });
        }
        res.status(200).json({ message: "vendorAccount deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});










module.exports = router