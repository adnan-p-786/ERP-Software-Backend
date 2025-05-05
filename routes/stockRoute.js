const express = require('express')
const stoksModel = require ('../models/stocks')
const { authenticateAdmin } = require('./auth')
const router = express.Router()

router.post('/post-stocks',authenticateAdmin, async(req,res)=>{
    try {
        const {productId,unitId,quantity,purchase_price,selling_price,storeId,warehouseId,vendorId,billNo} = req.body
        if (!productId || !unitId || !quantity || !purchase_price || !selling_price || !storeId || !warehouseId ||!vendorId ||!billNo){
            res.status(200).json({message: "all fields are required"})
        }
        const newData = await stoksModel.create({productId,unitId,quantity,purchase_price,selling_price,storeId,warehouseId,vendorId,billNo})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get-stocks',authenticateAdmin, async (req, res) => {
    try {
        const data = await stoksModel.find()
        .populate('productId')
        .populate('unitId')
        .populate('storeId')
        .populate('warehouseId')
        .populate('vendorId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put-stocks/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await stoksModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-stocks/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await stoksModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "stocks not found" });
        }
        res.status(200).json({ message: "stocks deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router