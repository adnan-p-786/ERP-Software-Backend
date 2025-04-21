const express = require('express')
const privilegesModel = require ('../models/privileges')
const router = express.Router()

router.post('/create-privileges',async(req,res)=>{
    try {
        const {crud,create,update,delete:del} =req.body
        if (!crud || !create || !update || !del){
            return res.status(400).json({message: "All fields are required"})
        }
        const newPrivilege = await privilegesModel.create({crud,create,update,delete:del})
        res.status(201).json(newPrivilege)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.get('/get-privileges', async (req, res) => {
    try {
        const data = await privilegesModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put-privileges/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await privilegesModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-privileges/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await privilegesModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "roles not found" });
        }
        res.status(200).json({ message: "roles deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router