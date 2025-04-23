const express = require('express')
const salesModel = require ('../models/sales')
const router = express.Router()

router.post('/post-sales',async(req,res)=>{
    try {
        const {storeId,warehouseId,customerId,total_amount,discountId,discounted_amount,usersId} = req.body
        if (!storeId || !warehouseId || !customerId || !total_amount || !discountId || !discounted_amount || !usersId){
            res.status(200).json({message: "all fields are required"})
        }
        const newData = await salesModel.create({storeId,warehouseId,customerId,total_amount,discountId,discounted_amount,usersId})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get-sales', async (req, res) => {
    try {
        const data = await salesModel.find()
        .populate('customerId')
        .populate('discountId')
        .populate('storeId')
        .populate('warehouseId')
        .populate('usersId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router