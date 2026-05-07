const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const DEFAULT_AVATAR = "https://images.unsplash.com/vector-1742875355318-00d715aec3e8?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

async function registerUser(req, res){
    const {name, email, password, role} = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "User already exists"
        })
    }

    if (role === "admin") {
        return res.status(403).json({
            message: "Admin cannot register"
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        name,
        email,
        password: hash,
        role,
        profileImage: DEFAULT_AVATAR,
        isVerified: false
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
            isVerified: user.isVerified
        }
    })

}

async function loginUser(req, res){

    const {email, password} = req.body;

    const user = await userModel.findOne({ email })

    if(!user){
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET,{expiresIn: "7d"})

    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
            isVerified: user.isVerified
        }
    })
}

async function logoutUser(req, res){
    try{
        res.clearCookie("token");
        res.status(200).json({
            message: "Logged out successfully"
        })
    }
    catch(err){
        return res.status(500).json({ message: "Server error" });
    }
}



module.exports = { registerUser, loginUser, logoutUser }