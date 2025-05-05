const express = require('express')
const accountsModel = require ('../models/accounts')
const { authenticateAdmin } = require('./auth')
const router = express.Router()


router.post('/post-Accounts',authenticateAdmin,async(req,res)=>{
    try {
        const {credit,debit,type,particulars} = req.body
        if (!type || !debit || !credit || !particulars){
            return res.status(400).json({message: "all fields are required"})
        }
        const newData = await accountsModel.create({type,debit,credit,particulars})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get-Accounts',authenticateAdmin, async (req, res) => {
    try {
        const data = await accountsModel.find()
        return res.status(200).json(data);
    } catch (error) {
       return res.status(400).json(error);
    }
});


router.put('/put-Accounts/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await accountsModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-Accounts/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await accountsModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.status(200).json({ message: "Account deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});




module.exports = router