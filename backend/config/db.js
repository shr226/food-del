import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://seharfatima9941:sehar@cluster0.6xdcz.mongodb.net/food_del?retryWrites=true&w=majority&appName=Cluster0');
        console.log('DB Connected');
    } catch (error) {
        console.error('DB Connection Error:', error);
    }
}
