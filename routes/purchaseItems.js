const express = require('express')
const purchaseItemsModel = require ('../models/purchase_items')
const router = express.Router()

router.post('/post-purchaseItems',async(req,res)=>{
    try {
        const {purchaseId,productId,unitsId,purchasePrice,sellingPrice,variantsId,quantity}= req.body
        if (!purchaseId || !productId || !unitsId || !purchasePrice ||!sellingPrice ||!variantsId ||!quantity )
            res.status(400).json({message: "all fields are required"})
        const newData = await purchaseItemsModel.create({productId,unitsId,purchasePrice,sellingPrice,variantsId,quantity})
        return res.status(201).json(newData)
    } catch (error) {
        return res.status(400).json(error)
    }
})


router.get('/get-purchaseItems', async (req, res) => {
    try {
        const data = await purchaseItemsModel.find()
        .populate('purchaseId')
        .populate('productId')
        .populate('unitsId')
        .populate('variantsId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router