const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require("multer");

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const companies = new CloudinaryStorage({
    cloudinary: cloudinary,
    params : {
        folder : `${process.env.NODE_ENV}/companies`,
        allowedFormats: ['jpeg', 'png', 'jpg'],
        transformation: [
            { width: 500, height: 500, crop: "fill" },

        ]
    }
})
const products = new CloudinaryStorage({
    cloudinary: cloudinary,
    params : {
        folder : `${process.env.NODE_ENV}/products`,
        allowedFormats: ['jpeg', 'png', 'jpg'],
        transformation: [
            { width: 500, height: 500, crop: "fill" },

        ]
    }
})
const categories = new CloudinaryStorage({
    cloudinary: cloudinary,
    params : {
        folder : `${process.env.NODE_ENV}/categories`,
        allowedFormats: ['jpeg', 'png', 'jpg'],
        transformation: [
            { width: 500, height: 500, crop: "fill" },

        ]
    }
})



module.exports = {
    companies,
    products,
    categories
}