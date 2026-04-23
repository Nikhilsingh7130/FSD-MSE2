const express = require('express');
const auth = require('../middleware/auth');
const {
  submitGrievance,
  getAllGrievances,
  getGrievanceById,
  updateGrievance,
  deleteGrievance,
  searchGrievances,
} = require('../controllers/grievanceController');

const router = express.Router();

// All grievance routes require authentication
router.use(auth);

// @route   POST /api/grievances
// @desc    Submit a new grievance
router.post('/', submitGrievance);

// @route   GET /api/grievances
// @desc    Get all grievances
router.get('/', getAllGrievances);

// @route   GET /api/grievances/search
// @desc    Search grievances
router.get('/search', searchGrievances);

// @route   GET /api/grievances/:id
// @desc    Get grievance by ID
router.get('/:id', getGrievanceById);

// @route   PUT /api/grievances/:id
// @desc    Update grievance
router.put('/:id', updateGrievance);

// @route   DELETE /api/grievances/:id
// @desc    Delete grievance
router.delete('/:id', deleteGrievance);

module.exports = router;
