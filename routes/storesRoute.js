const express = require('express')
const storesModel = require ('../models/stores')
const router = express.Router()




router.post('/post-stores',async(req,res)=>{
    try {
        const {name,username,password,phone,email,active} = req.body
        if (!name || !username || !password || !phone || !email || !active){
            res.status(200).json({message: "all fields are required"})
        }
        const newData = await storesModel.create({name,username,password,phone,email,active})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get-stores', async (req, res) => {
    try {
        const data = await storesModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put-stores/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await storesModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-stores/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await storesModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "stores not found" });
        }
        res.status(200).json({ message: "stores deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});





module.exports = router