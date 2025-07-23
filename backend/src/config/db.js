import mongoose from 'mongoose';

export const connectDB = async() =>{
    try {
        await mongoose.connect (process.env.MONGO_URI);
        console.log ('MONGODB IS CONNECTED SUCESSFULLY');
    } catch (error) {
        console.error('MONGODB CONNECTION FAILED', error);
        process.exit(1); // Exit the process with failure
    }
};
