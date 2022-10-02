const User = require('../models/User');

// Create new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Get specific user by ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ success: false, error: `No user with id ${req.params.id} in databases` });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Update existing user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(400).json({ success: false, error: `No user with id ${req.params.id} in databases` });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({ success: false, error: `No user with id ${req.params.id} in databases` });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};
