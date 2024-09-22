import { Router } from 'express';
import { signupValidation, loginValidation } from '../middlewares/AuthValidation.js'; 
import { login, signup } from '../controllers/AuthController.js';


const AuthRouter = Router();

AuthRouter.post('/login', loginValidation,login);

AuthRouter.post('/signup', signupValidation, signup);

export default AuthRouter;
