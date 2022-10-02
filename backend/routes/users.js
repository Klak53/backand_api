const express = require('express');

const router = express.Router();

const { createUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/users');

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
