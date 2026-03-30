# File Upload Application with AWS S3 and MongoDB

A full-stack application for user registration with file upload capabilities to AWS S3.

## Live Demo

- Frontend: [https://your-frontend-url.onrender.com](https://your-frontend-url.onrender.com)
- Backend API: [https://user-file-upload-api.onrender.com](https://user-file-upload-api.onrender.com)

## Features

- 📝 User registration with multiple fields
- 📎 Drag-and-drop file upload (up to 15 files)
- ☁️ AWS S3 integration for file storage
- 🗄️ MongoDB for data persistence
- 🎨 Modern React frontend with Tailwind CSS
- 🚀 RESTful API with Node.js/Express

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios
- React Dropzone

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- AWS SDK v2
- Multer for file handling

## Deployment

This application is deployed on Render.com with:
- Automatic deployments from GitHub
- MongoDB Atlas for database
- AWS S3 for file storage

## Environment Variables

Create a `.env` file in the server directory:

```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=ap-south-1
AWS_S3_BUCKET_NAME=your-bucket-name