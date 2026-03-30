const AWS = require('aws-sdk');
require('dotenv').config();

console.log('AWS SDK Version:', AWS.VERSION);

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

async function testSimpleUpload() {
  try {
    const testContent = Buffer.from('This is a test file content', 'utf-8');
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `test/test-${Date.now()}.txt`,
      Body: testContent,
      ContentType: 'text/plain',
    };
    
    console.log('Uploading test file...');
    const result = await s3.upload(params).promise();
    console.log('✅ Upload successful!');
    console.log('File URL:', result.Location);
    
    // Clean up
    await s3.deleteObject({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: params.Key,
    }).promise();
    console.log('✅ Test file cleaned up');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  }
}

testSimpleUpload();