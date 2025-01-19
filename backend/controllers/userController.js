import User from "../models/userModel.js"; // Import the User model
import bcrypt from "bcryptjs";  // To hash and compare passwords
import jwt from "jsonwebtoken";  // To generate JWT tokens

// Register a new user
export async function register(req, res) {
    const { username, password, email, avatar } = req.body;
 try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
     }
// Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
// Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
            email,  
            avatar  
        });
// Save the user to the database
    await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export async function login(req, res) {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, "secretKey");

        // Include username and email in the response
        res.status(200).json({
            message: "Login successful",
            token,
            email: user.email, // Send email in the response
            username: user.username // Send username in the response
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
