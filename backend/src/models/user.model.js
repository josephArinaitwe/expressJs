import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 1,
        maxLength: 30,
    },

    password:{
        type: String,
        required: true,
        minLength: 6,
        maxLength: 1024,
    },

    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
},

    {
        timestamps: true
    }
);

//hashing password before saving user
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();

})

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema); 