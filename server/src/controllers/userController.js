const userService = require('../services/userService');
const s3Service = require('../services/s3Service');
const { validationResult } = require('express-validator');

class UserController {
  async createUser(req, res, next) {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if files are uploaded
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'At least one file is required' });
      }

      if (req.files.length > 15) {
        return res.status(400).json({ error: 'Maximum 15 files allowed' });
      }

      console.log(`Received ${req.files.length} files`);

      // Upload files to S3
      const uploadedFiles = await s3Service.uploadMultipleFiles(req.files);

      const userData = {
        name: req.body.name,
        surname: req.body.surname,
        dob: req.body.dob,
        address: req.body.address,
        state: req.body.state,
        country: req.body.country,
        birthplace: req.body.birthplace,
      };

      const user = await userService.createUser(userData, uploadedFiles);
      
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const user = await userService.getUserById(req.params.id);
      
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      
      const result = await userService.getAllUsers(page, limit);
      
      res.status(200).json({
        success: true,
        data: result.users,
        pagination: {
          page: result.page,
          limit: limit,
          total: result.total,
          pages: result.pages,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await userService.updateUser(req.params.id, req.body);
      
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      await userService.deleteUser(req.params.id);
      
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async addFilesToUser(req, res, next) {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'At least one file is required' });
      }

      const uploadedFiles = await s3Service.uploadMultipleFiles(req.files);
      const user = await userService.addFilesToUser(req.params.id, uploadedFiles);
      
      res.status(200).json({
        success: true,
        message: 'Files added successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async removeFileFromUser(req, res, next) {
    try {
      const user = await userService.removeFileFromUser(req.params.userId, req.params.fileId);
      
      res.status(200).json({
        success: true,
        message: 'File removed successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();