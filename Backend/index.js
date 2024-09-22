import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import AuthRouter from './routes/AuthRouter.js';
import ProductRouter from './routes/ProductRouter.js';


dotenv.config()

const app = express();
const PORT=process.env.PORT||4000

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter)
app.use('/products',ProductRouter)


connectDB();
app.listen(PORT,()=>{
    console.log(`Server is running on port:${PORT}`);
})


