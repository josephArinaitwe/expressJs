import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        } 
        //check for existing user
        const existing = await User.findOne({email: email.toLowerCase()});
        if(existing){
            return res.status(400).json({ message: "User already exists. Please login." });
        }
        // hash password server-side to ensure it's stored hashed
        const hashedPassword = await bcrypt.hash(password, 10);
        // create User
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: hashedPassword,
            loggedIn: "false"
        });
        
        res.status(201).json({ 
            message: "User registered successfully", 
            user: {id: user._id, email: user.email, username: user.username} 
        });
        
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error: error.message})
    }
};

const loginUser = async (req, res) => {
    try {
        //check if user exists
        const { email, password} = req.body;
        const user = await User.findOne({
            email: email.toLowerCase()
        })
        //user does not exist
        if(!user){
            return res.status(400).json({ 
                message: "User does not exist. Please Register."
            });
        }
        //validate Password (temporary debug logs)
        console.log(`Login attempt for ${user.email}`);
        console.log('provided password length:', password ? password.length : 0);
        console.log('stored password length:', user.password ? user.password.length : 0);
        let isMatch = await user.comparePassword(password);
        console.log('password comparison result:', isMatch);
        
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }
        res.status(200).json({
            message: "Login Successfull",
            user: {
                id:user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
        
    }
}

const getUsers= async(res) => {
    try {
        const users = await User.find({})
        const userList = users.map(user => ({
            id: user._id,
            username: user.username,
            email: user.email,
        }));
        res.status(200).json({ users: userList });
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error: error.message})
    }

}

export {
    registerUser,
    getUsers,
    loginUser
}