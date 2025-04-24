const express = require('express')
const purchaseOtherexpModel = require ('../models/purchaseotherExp')
const router = express.Router()


router.post('/post-purchaseotherExp',async(req,res)=>{
    try {
        const {otherExpenseId,purchaseId,amount}= req.body
        if (!otherExpenseId || !purchaseId || !amount)
            res.status(400).json({message: "all fields are required"})
        const newData = await purchaseOtherexpModel.create({otherExpenseId,purchaseId,amount})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get-purchaseotherExp',async(req, res) => {
    try {
        const data = await purchaseOtherexpModel.find()
        .populate('otherExpenseId')
        .populate('purchaseId')
        if(data.length > 0){
            return  res.status(200).json(data);
        }else{
            return res.status(400).json("no data");
        }
    } catch (error) {
       return res.status(400).json(error.message);
    }
});

module.exports = router