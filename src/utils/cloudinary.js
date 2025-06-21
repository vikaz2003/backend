import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import path from "path";



 

const uploadOnCloudinary=async(localFilePath)=>{
    try{
        cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET
        });
        if(!localFilePath) return null

        // upload the file on cloudinary
        const normalizedPath = path.resolve(localFilePath);
       const response=await cloudinary.uploader.upload(normalizedPath,{
            resource_type:"auto"
        })
        //file has been uploaded successfully
        console.log("file is uploaded on cloudinary",response.url)
        fs.unlinkSync(normalizedPath)
        return response
    }catch(error){
         console.error("Cloudinary upload error:", error); 
         fs.unlinkSync(normalizedPath) // remove the temporary file as the upload operation got failed
    }
}

export {uploadOnCloudinary}

