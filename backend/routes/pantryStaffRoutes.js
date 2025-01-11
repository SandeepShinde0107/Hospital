const express = require('express');
const { createPantryStaff, getPantryStaff, updatePantryStaff, deletePantryStaff } = require('../controllers/pantryStaffController');
const router = express.Router();

// Route to create a new pantry staff member
router.post('/', createPantryStaff);

// Route to get all pantry staff members
router.get('/', getPantryStaff);

// Route to update a specific pantry staff member
router.put('/:id', updatePantryStaff);

// Route to delete a specific pantry staff member
router.delete('/:id', deletePantryStaff);

module.exports = router;
