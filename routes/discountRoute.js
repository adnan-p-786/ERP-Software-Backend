const express = require('express')
const discountModel = require ('../models/discount')
const router = express.Router()



router.post('/post-discount',async(req,res)=>{
    try {
        const {name,type,value} = req.body
        if (!name || !type ||!value){
            return res.status(400).json({message: "all fields are required"})
        }
        const newData = await discountModel.create({name,type,value})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get-discount', async (req, res) => {
    try {
        const data = await discountModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put-discount/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await discountModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-discount/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await discountModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "discount not found" });
        }
        res.status(200).json({ message: "discount deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router