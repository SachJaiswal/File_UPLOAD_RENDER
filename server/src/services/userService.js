const userRepository = require('../repositories/userRepository');
const s3Service = require('./s3Service');

class UserService {
  async createUser(userData, files = []) {
    try {
      // Process files if any
      const fileData = [];
      if (files && files.length > 0) {
        for (const file of files) {
          fileData.push({
            fileName: file.fileName,      // From S3 service
            originalName: file.originalName,
            url: file.url,
            fileType: file.fileType,
            fileSize: file.fileSize,
          });
        }
      }

      // Create user with files
      const user = await userRepository.create({
        ...userData,
        files: fileData,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await userRepository.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(page, limit) {
    try {
      return await userRepository.findAll({}, page, limit);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, updateData) {
    try {
      const user = await userRepository.update(id, updateData);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const user = await userRepository.findById(id);
      if (!user) {
        throw new Error('User not found');
      }

      // Delete all files from S3
      for (const file of user.files) {
        await s3Service.deleteFile(file.url);
      }

      // Delete user from database
      await userRepository.delete(id);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async addFilesToUser(userId, files) {
    try {
      const user = await userRepository.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const fileData = [];
      for (const file of files) {
        fileData.push({
          fileName: file.fileName,
          originalName: file.originalName,
          url: file.url,
          fileType: file.fileType,
          fileSize: file.fileSize,
        });
      }

      return await userRepository.addFiles(userId, fileData);
    } catch (error) {
      throw error;
    }
  }

  async removeFileFromUser(userId, fileId) {
    try {
      const user = await userRepository.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Find the file to delete from S3
      const fileToDelete = user.files.find(file => file._id.toString() === fileId);
      if (fileToDelete) {
        await s3Service.deleteFile(fileToDelete.url);
      }

      return await userRepository.removeFile(userId, fileId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();