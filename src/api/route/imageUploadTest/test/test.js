const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
dotenv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const file = fs.createReadStream(path.join(__dirname, './image.png'));
const params = {
    Bucket: 'test-vus',
    Key: 'images/origin/' + Date.now() + '.png',
    Body: file,
    ACL: 'public-read',
    //ContentType: 'image/png',
};
console.log(file);
s3.upload(params, function (err, data) {
    if (err) throw err;
    console.log(data);
});
