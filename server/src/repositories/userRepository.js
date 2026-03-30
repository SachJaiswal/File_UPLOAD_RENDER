const User = require('../models/user');


class UserRepository {
  async create(userData) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async findAll(filter = {}, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const users = await User.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      
      const total = await User.countDocuments(filter);
      
      return {
        users,
        total,
        page,
        pages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  async update(id, updateData) {
    try {
      return await User.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      return await User.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async addFiles(userId, filesData) {
    try {
      return await User.findByIdAndUpdate(
        userId,
        { $push: { files: { $each: filesData } } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async removeFile(userId, fileId) {
    try {
      return await User.findByIdAndUpdate(
        userId,
        { $pull: { files: { _id: fileId } } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserRepository();