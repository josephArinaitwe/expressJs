import { Router } from "express";
import { registerUser, getUsers, loginUser } from "../controllers/user.controller.js"; 
const router = Router();
 
router.route('/register').post(registerUser); 
router.route('/').get(getUsers);
router.route('/login').post(loginUser);

export default router;