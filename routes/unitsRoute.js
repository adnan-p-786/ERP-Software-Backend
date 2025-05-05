const express = require('express')
const unitsModel = require ('../models/units')
const { authenticateAdmin } = require('./auth')
const router = express.Router()


router.post('/post-units',authenticateAdmin,async(req,res)=>{
    try {
        const {name,value} = req.body
        if (!name || !value){
            return res.status(400).json({message: "all fields are required"})
        }
        const newData = await unitsModel.create({name,value})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get-units',authenticateAdmin, async (req, res) => {
    try {
        const data = await unitsModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put-units/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await unitsModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-units/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await unitsModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "units not found" });
        }
        res.status(200).json({ message: "units deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router