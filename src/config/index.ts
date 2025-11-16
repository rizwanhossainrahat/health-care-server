import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    cloudinary:{
        api_secret:process.env.CLOUDINARY_API_SECRET,
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY
    },
    jwt:{
        jwt_access_secret:process.env.JWT_ACCESS_SECRET,
        jwt_access_expire:process.env.JWT_ACCESS_EXPIRE,
        jwt_refresh_secret:process.env.JWT_REFRESH_SECRET,
        jwt_refresh_expire:process.env.JWT_REFRESH_EXPIRE
    },
    openRouterApiKey:process.env.OPENROUTER_API_KEY
}