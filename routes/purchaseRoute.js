const express = require('express')
const purchaseModel = require ('../models/purchase')
const purchaseItemsModel = require ('../models/purchase_items')
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


module.exports = router