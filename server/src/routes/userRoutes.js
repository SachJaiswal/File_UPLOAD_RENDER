const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const uploadMiddleware = require('../middleware/upload');
const { validateUser } = require('../utils/validators');

// User routes
router.post(
  '/',
  uploadMiddleware,
  validateUser,
  userController.createUser
);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', validateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

// File management routes
router.post(
  '/:id/files',
  uploadMiddleware,
  userController.addFilesToUser
);

router.delete(
  '/:userId/files/:fileId',
  userController.removeFileFromUser
);

module.exports = router;