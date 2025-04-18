import { Router } from 'express';
import { register } from '../controllers/post/auth-register';
import { login } from '../controllers/post/auth-login';


const router = Router();

router.post('/register', register);
router.post("/login", login)
export const authRoutes = router;
