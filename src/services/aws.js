const AWS = require('aws-sdk');

module.exports = {
    IAM_USER_KEY: process.env.USER_KEY,
    IAM_USER_SECRET: 'RToXHZlThBOktj/jEs4Up08CQe/dBAT//C1Vm7IJ',
    BUCKET_NAME: 'clinica-odonto-bucket',
    AWS_REGION: 'us-east-1',

    uploadToS3: function (file, filename, acl = 'public-read') {
        return new Promise((resolve, reject) => {

            let IAM_USER_KEY = this.IAM_USER_KEY;

            let IAM_USER_SECRET = this.IAM_USER_SECRET;

            let BUCKET_NAME = this.BUCKET_NAME;

            let s3bucket = new AWS.S3({
                accessKeyId: IAM_USER_KEY,
                secretAccessKey: IAM_USER_SECRET,
                Bucket: BUCKET_NAME
            });

            s3bucket.createBucket(function () {
                var params = {
                    Bucket: BUCKET_NAME,
                    Key: filename,
                    Body: file.data,
                    ACL: acl // Adding ACL here
                };

                // S3 ManagedUpload with callbacks are not supported in AWS SDK for JavaScript (v3).
                // Please convert to 'await client.upload(params, options).promise()', and re-run aws-sdk-js-codemod.
                s3bucket.upload(params, function (err, data) {
                    if (err) {
                        console.log(err);
                        return resolve({ error: true, message: err.message })
                    }
                    console.log(data);
                    return resolve({ error: false, message: data })
                });
            });
        });
    },


    
    deleteFileS3: function (key) {
        return new Promise((resolve, reject) => {
            let IAM_USER_KEY = this.IAM_USER_KEY;
            let IAM_USER_SECRET = this.IAM_USER_SECRET;
            let BUCKET_NAME = this.BUCKET_NAME;

            let s3bucket = new AWS.S3({
                accessKeyId: IAM_USER_KEY,
                secretAccessKey: IAM_USER_SECRET,
                Bucket: BUCKET_NAME
            });

            s3bucket.createBucket(function () {
                s3bucket.deleteBucket(
                    {
                        Bucket: BUCKET_NAME,
                        key: key
                    },
                    function (err, data) {
                        if (err) {
                            console.log(err)
                            return resolve({ error: true, message: err })
                        }
                        console.log(data);
                        return resolve({ error: false, message: data })
                    }
                )
            })
        });
    }
};
