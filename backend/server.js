import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import useRouter from './routes/userRoutes.js';
import 'dotenv/config.js'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoutes.js';

// App configuration
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// API endpoints
app.use('/api/food', foodRouter);
app.use("/images",express.static('uploads'))
app.use("/api/user",useRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)

app.get('/', (req, res) => {
    res.send('API Working');
});

// Start server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
