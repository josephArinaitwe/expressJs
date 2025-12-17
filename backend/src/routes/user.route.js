import { Router } from "express";
import { registerUser, getUsers } from "../controllers/user.controller.js"; 
const router = Router();
 
router.route('/register').post(registerUser); 
router.route('/').get(getUsers);
router.route()
export default router;