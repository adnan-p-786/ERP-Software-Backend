const express = require('express')
const otherExpensesmodel = require ('../models/otherExpenses');
const { authenticateAdmin } = require('./auth');
const router = express.Router()


router.post('/post-otherExpenses',authenticateAdmin, async (req, res) => {
    try {
        if (req.body.name){
            const racks = new otherExpensesmodel({
                name: req.body.name
            });
            const savedexp = await racks.save();
            res.status(201).json(savedexp);
        }
        else{
            return res.status(400).json("name must be required")
        }
        
    } catch (error) {
        res.status(400).json(error);
    }
});


router.get('/get-otherExpenses',authenticateAdmin, async (req, res) => {
    try {
        const data = await otherExpensesmodel.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put-otherExpenses/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await otherExpensesmodel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-otherExpenses/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await otherExpensesmodel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "expense not found" });
        }
        res.status(200).json({ message: "expense deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});




module.exports = router