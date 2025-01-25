const cloudinary = require('cloudinary').v2;

async  function uploadImgToCloudinary(file , folder , quality){
    const options = {folder}
    if(quality){
        options.quality = quality ;
    }
    return await cloudinary.uploader.upload(file,options);
}

function isFileTypeSupported(supported , fileType){
    return supported.includes(fileType);
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
    isFileTypeSupported,
    getnameFromURL,
};