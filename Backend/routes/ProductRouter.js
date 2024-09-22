import { Router } from 'express';
import ensureAuthenticated from '../middlewares/Auth.js';

const ProductRouter = Router();

ProductRouter.get('/',ensureAuthenticated,(req,res)=>{
    console.log('....Logged in user detail....',req.user);
    
    res.status(200).json([
        {
            name:"Mobile",
            price:10000
        },
        {
           name:"TV",
           price:20000 
        }
    ])
})

export default ProductRouter;
