const Grievance = require('../models/Grievance');

// @route   POST /api/grievances
// @desc    Submit a new grievance
// @access  Private
exports.submitGrievance = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    // Validate input
    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const grievance = new Grievance({
      title,
      description,
      category,
      student: req.studentId,
    });

    await grievance.save();

    res.status(201).json({
      message: 'Grievance submitted successfully',
      grievance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/grievances
// @desc    Get all grievances for logged-in student
// @access  Private
exports.getAllGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find({ student: req.studentId }).populate('student', 'name email');

    res.status(200).json({
      message: 'Grievances retrieved successfully',
      count: grievances.length,
      grievances,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/grievances/:id
// @desc    Get a specific grievance by ID
// @access  Private
exports.getGrievanceById = async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id).populate('student', 'name email');

    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    // Check authorization
    if (grievance.student._id.toString() !== req.studentId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.status(200).json({
      message: 'Grievance retrieved successfully',
      grievance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   PUT /api/grievances/:id
// @desc    Update a grievance
// @access  Private
exports.updateGrievance = async (req, res) => {
  try {
    let grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    // Check authorization
    if (grievance.student.toString() !== req.studentId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Update fields
    const { title, description, category, status } = req.body;
    if (title) grievance.title = title;
    if (description) grievance.description = description;
    if (category) grievance.category = category;
    if (status) grievance.status = status;

    await grievance.save();

    res.status(200).json({
      message: 'Grievance updated successfully',
      grievance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   DELETE /api/grievances/:id
// @desc    Delete a grievance
// @access  Private
exports.deleteGrievance = async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    // Check authorization
    if (grievance.student.toString() !== req.studentId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    await Grievance.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Grievance deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/grievances/search
// @desc    Search grievances by title
// @access  Private
exports.searchGrievances = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: 'Please provide a search title' });
    }

    const grievances = await Grievance.find({
      student: req.studentId,
      title: { $regex: title, $options: 'i' },
    }).populate('student', 'name email');

    res.status(200).json({
      message: 'Search results retrieved',
      count: grievances.length,
      grievances,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
