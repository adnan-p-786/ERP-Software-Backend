const express = require('express')
const customersAccountModel = require ('../models/customerAccounts')
const { authenticateAdmin } = require('./auth')
const router = express.Router()


router.post('/post-customerAccounts',authenticateAdmin ,async(req,res)=>{
    try {
        const {type,debit,credit,customerId} = req.body
        if (!type || !debit || !credit || !customerId){
            return res.status(400).json({message: "all fields are required"})
        }
        const newData = await customersAccountModel.create({type,debit,credit,customerId})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get-customerAccounts',authenticateAdmin, async (req, res) => {
    try {
        const data = await customersAccountModel.find()
        .populate('customerId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put-customerAccounts/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await customersAccountModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-customerAccounts/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await customersAccountModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "customerAccount not found" });
        }
        res.status(200).json({ message: "customerAccount deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});




module.exports = router