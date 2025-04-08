const express = require('express')
const expenseModel = require ('../models/expenses')
const router = express.Router()


router.post('/post-expenses',async(req,res)=>{
    try {
        const {date,amount,expenseTypeId}= req.body
        if (!date || !amount || !expenseTypeId )
            res.status(400).json({message: "all fields are required"})
        const newData = await expenseModel.create({date,amount,expenseTypeId})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get-expenses', async (req, res) => {
    try {
        const data = await expenseModel.find()
        .populate('expenseTypeId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put-expenses/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await expenseModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-expenses/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await expenseModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "expense not found" });
        }
        res.status(200).json({ message: "expense deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});




module.exports = router