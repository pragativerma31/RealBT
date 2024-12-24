const cloudinary = require('cloudinary').v2;

async  function uploadImgToCloudinary(file , folder , quality){
    const options = {folder}
    if(quality){
        options.quality = quality ;
    }
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

function isFileTypeSupported(supported , fileType){
    return supported.includes(fileType);
}

module.exports = {
    uploadImgToCloudinary,
    isFileTypeSupported,
};