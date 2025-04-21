const express = require('express')
const rolesModel = require ('../models/roles')
const router = express.Router()



router.post('/create-roles',async(req,res)=>{
    try {
        const {name,description,privilegesId} =req.body
        if (!name || !description || !privilegesId){
            return res.status(400).json({message: "name, description and privilegesId are required"})
        }
        const newRole = await rolesModel.create({name, description, privilegesId})
        res.status(201).json(newRole)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.get('/get-roles', async (req, res) => {
    try {
        const data = await rolesModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.put('/put-roles/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await rolesModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-roles/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await rolesModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "roles not found" });
        }
        res.status(200).json({ message: "roles deleted successfully", deleteddepartment: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router