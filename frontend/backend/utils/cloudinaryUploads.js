const cloudinary = require('cloudinary').v2;

async  function uploadImgToCloudinary(file , folder  , isvideo , quality){
    const options = {folder}
    if(quality){
        options.quality = quality ;
    }
    if(isvideo){
        options.resource_type = "video";
    }
    return await cloudinary.uploader.upload(file,options);
}

const uploadFilesToCloudinary = async (files, folder,isvideo, quality = 80) => {
    let uploadedFiles = [];
    if (Array.isArray(files)) {
        for (let file of files) {
            const response = await uploadImgToCloudinary(file.tempFilePath, folder,isvideo, quality);
            uploadedFiles.push(response.secure_url); // Cloudinary returns secure_url
        }
    } else {
        const response = await uploadImgToCloudinary(files.tempFilePath, folder, isvideo ,quality);
        uploadedFiles.push(response.secure_url);
    }
    return uploadedFiles;
};

function isFileTypeSupported(supported , file){
    return supported.includes(file.mimetype);
}

function CheckArrayOrSingleFile(files , supportedTypes){
    if (Array.isArray(files)) {
        files.forEach(file => {
            if (!isFileTypeSupported(supportedTypes,file )) {
                return false;
            }
        });
    } 
    else if (files) {
        if (!isFileTypeSupported(supportedTypes, files)) {
            return false;
        }
    }
    return true
}


function getnameFromURL(url) {
    // Extract everything after the last '/'
    const publicIdWithExtension = url.substring(url.lastIndexOf('/') + 1);
    // Remove the file extension by splitting at '.'
    const publicId = publicIdWithExtension.split('.')[0];
    return publicId;
}
  


module.exports = {
    uploadImgToCloudinary,
    uploadFilesToCloudinary,
    isFileTypeSupported,
    getnameFromURL,
    CheckArrayOrSingleFile
};