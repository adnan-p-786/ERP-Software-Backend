const express = require('express');
const rolesModel = require('../models/roles');
const privilegesModel = require('../models/privileges');
const router = express.Router();

router.post('/post-roles', async (req, res) => {
    try {
        const { name, description, privileges } = req.body;

        if (!name || !description || !privileges) {
            return res.status(400).json({ message: "name, description, and privileges are required" });
        }

        const { crud, create, update, delete: del } = privileges;

        if (crud === undefined || !Array.isArray(create) || !Array.isArray(update) || !Array.isArray(del)) {
            return res.status(400).json({ message: "Invalid privileges structure" });
        }

        const newPrivileges = await privilegesModel.create({
            crud,
            create,
            update,
            delete: del
        });

        const newRole = await rolesModel.create({
            name,
            description,
            privileges: newPrivileges._id
        });

        res.status(201).json({
            message: 'Role and privileges created successfully',
            role: newRole,
            privileges: newPrivileges
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/get-roles', async (req, res) => {
    try {
        const roles = await rolesModel.find().populate('privileges');
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;





// router.put('/put-roles/:id', async (req, res) => {
//     try {
//         const id = req.params.id
//         const updateData = await rolesModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
//         res.status(200).json(updateData)
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })


// router.delete('/delete-roles/:id', async (req, res) => {
//     try {
//         const id = req.params.id; 
//         const deleteData = await rolesModel.findByIdAndDelete(id);
//         if (!deleteData) {
//             return res.status(404).json({ message: "roles not found" });
//         }
//         res.status(200).json({ message: "roles deleted successfully", deleteddepartment: deleteData });
//     } catch (error) {
//         res.status(400).json(error);
//     }
// });


