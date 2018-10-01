const multer = require('multer');
const multerS3 = require('multer-s3');
const moment = require('moment')
const aws = require('aws-sdk');

aws.config.loadFromPath('./config/s3.json');

const s3 = new aws.S3();

module.exports = {
    getMulter: function (package) {
        const date = {
            YYYY: moment().format('YYYY'),
            MM: moment().format('MM'),
            DD: moment().format('DD')
        }
        return multer({
            storage: multerS3({
                s3: s3,
                bucket: '',
                acl: '',
                key: function (req, file, cb) {
                    cb(null, `${package}/${date.YYYY}/${date.MM}/${date.DD}/${file.originalname}`)
                }
            })
        })
    }
}