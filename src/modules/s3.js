const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const uploadS3 = ({ fileStream, filename }) => {
    const params = {
        Bucket: 'test-vus',
        Key: `images/origin/${Date.now()}.${filename.split('.').pop()}`,
        Body: fileStream,
        ACL: 'public-read',
    };

    s3.upload(params, function (err, data) {
        if (err) throw err;
        console.log(data);
    });
};

module.exports = uploadS3;
