import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder:'Habify_Uploads', // your folder in Cloudinary
      resource_type: 'auto', // VERY IMPORTANT - auto allows all file types
      public_id: file.originalname.split('.')[0], // file name without extension
    };
  },
});

// Multer setup
const upload = multer({ storage });

export { cloudinary, upload };
