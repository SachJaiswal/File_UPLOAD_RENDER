const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
require('dotenv').config();

// Configure AWS SDK v2
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

class S3Service {
  async uploadFile(file) {
    try {
      const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
      const folderPath = `users/${Date.now()}`;
      const key = `${folderPath}/${uniqueFileName}`;
      
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      
      console.log(`Uploading file: ${file.originalname} (${file.size} bytes)`);
      const result = await s3.upload(params).promise();
      console.log(`Upload successful: ${result.Location}`);
      
      // Return in the exact format expected by the schema
      return {
        fileName: key,  // This is the S3 key/path
        originalName: file.originalname,
        url: result.Location,
        fileType: file.mimetype,
        fileSize: file.size,
      };
    } catch (error) {
      console.error('Error uploading to S3:', error);
      throw new Error(`Failed to upload file ${file.originalname}: ${error.message}`);
    }
  }

  async uploadMultipleFiles(files) {
    try {
      const uploadPromises = files.map(file => this.uploadFile(file));
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error uploading multiple files:', error);
      throw error;
    }
  }

  async deleteFile(fileUrl) {
    try {
      // Extract key from URL
      const bucketName = process.env.AWS_S3_BUCKET_NAME;
      const region = process.env.AWS_REGION;
      
      let key;
      if (fileUrl.includes(`.s3.${region}.amazonaws.com`)) {
        key = fileUrl.split(`.s3.${region}.amazonaws.com/`)[1];
      } else if (fileUrl.includes(`.s3.amazonaws.com`)) {
        key = fileUrl.split(`.s3.amazonaws.com/`)[1];
      } else {
        key = fileUrl.split(`${bucketName}/`)[1];
      }
      
      const params = {
        Bucket: bucketName,
        Key: key,
      };
      
      await s3.deleteObject(params).promise();
      console.log(`File deleted: ${fileUrl}`);
      return true;
    } catch (error) {
      console.error('Error deleting file from S3:', error);
      throw new Error('Failed to delete file from S3');
    }
  }
}

module.exports = new S3Service();