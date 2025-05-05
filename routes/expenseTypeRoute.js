const express = require('express')
const expenseTypeModel = require ('../models/expenseType');
const { authenticateAdmin } = require('./auth');
const router = express.Router()


router.post('/post-expenseType',authenticateAdmin, async (req, res) => {
    try {
        if(req.body.name){
            const expense = new expenseTypeModel({
                name: req.body.name
            });
            const savedExpense = await expense.save();
            res.status(201).json(savedExpense);
        }
        else{
            return res.status(400).json("name must be required")
        }
    } catch (error) {
        res.status(400).json(error);
    }
});


router.get('/get-expenseType',authenticateAdmin, async (req, res) => {
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