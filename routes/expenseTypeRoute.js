const express = require('express')
const expenseTypeModel = require ('../models/expenseType')
const router = express.Router()


router.post('/post-expenseType', async (req, res) => {
    try {
        const expense = new expenseTypeModel({
            name: req.body.name
        });
        const savedExpense = await expense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.get('/get-expenseType', async (req, res) => {
    try {
        const data = await expenseTypeModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put-expenseType/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await expenseTypeModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-expenseType/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await expenseTypeModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "expense not found" });
        }
        res.status(200).json({ message: "expense deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router