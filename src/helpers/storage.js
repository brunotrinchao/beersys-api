const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require("multer");

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const storage =new CloudinaryStorage({
    cloudinary: cloudinary,
    params : {
        folder : process.env.NODE_ENV,
        allowedFormats : ['jpeg','png','jpg']
    }
})

const limits = {
  fileSize: 500 * 1024,
  files: 1,
};


const upload = multer(
    {
        storage: storage,
        limits: limits
    }
);

module.exports = upload