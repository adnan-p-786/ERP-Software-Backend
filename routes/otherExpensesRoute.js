const express = require('express')
const otherExpensesmodel = require ('../models/otherExpenses')
const router = express.Router()


router.post('/post-otherExpenses',async(req,res)=>{
    try {
        const {name,amount}= req.body
        if (!name || !amount )
            res.status(400).json({message: "all fields are required"})
        const newData = await otherExpensesmodel.create({name,amount})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get-otherExpenses', async (req, res) => {
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