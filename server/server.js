const app = require('./src/app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

// For Render.com - ensure proper shutdown
const server = app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});