const express = require('express')
const purchaseModel = require ('../models/purchase')
const router = express.Router()

router.post('/post-purchase',async(req,res)=>{
    try {
        const {billNo,vendorId,storeId,warehouseId,totalAmount,otherExpense}= req.body
        if (!billNo || !vendorId || !storeId ||!warehouseId ||!totalAmount ||!otherExpense )
            res.status(400).json({message: "all fields are required"})
        const newData = await purchaseModel.create({billNo,vendorId,storeId,warehouseId,totalAmount,otherExpense})
        return res.status(201).json(newData)
    } catch (error) {
        return res.status(400).json(error)
    }
})


router.get('/get-purchase', async (req, res) => {
    try {
        const data = await purchaseModel.find()
        .populate('vendorId')
        .populate('storeId')
        .populate('warehouseId')
        .populate('otherExpense')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put-purchase/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await purchaseModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-purchase/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await purchaseModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "purchase not found" });
        }
        res.status(200).json({ message: "purchase deleted successfully", deletedproduct: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});











module.exports = router