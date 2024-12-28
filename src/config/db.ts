import mongoose from 'mongoose';

export const connectDB = () => {

    try {
        //@ts-ignore
        mongoose.connect(process.env.MONGODB_URL);
    } catch (e) {
        console.log(e);
    }

}