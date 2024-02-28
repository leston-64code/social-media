const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

exports.uploadToS3 = async (buffer, key) => {

    try {
        const client = new S3Client();
        
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Body: buffer
        };

        await client.send(new PutObjectCommand(params))
    } catch (error) {
        throw error;
    }

}