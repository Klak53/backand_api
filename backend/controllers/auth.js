const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.create({ firstName, lastName, email, password });
    const token = user.getSignedJwtToken();
    return res.status(200).json({ success: true, token, user });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ success: false, error: 'Please provide an email and password' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, error: 'No such user in mail authorization database' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid password' });
    }

    const token = user.getSignedJwtToken();

    return res.status(200).json({ success: true, token, user });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};
