const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

// Create User by Admin
const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status.json({ message: 'user created successfully' }, user);
});

const getUsers = catchAsync(async (req, res) => {
  const result = await userService.queryUsers();
  res.status(200).json(result);
});

// Get User by Id
const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.status(200).json(user);
});

// Update User by Admin
const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.status(200).json({ message: 'User updated successfuly' }, user);
});

// Delete User by Admin
const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(200).json({ message: 'User Deleted Successfully' });
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
