import { User } from "../models/user.model.js";

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
        // create User
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
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
        //validate Password
        isMatch = await user.comparePassword(password);
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
    getUsers
}