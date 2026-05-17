
import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async userSignUp(req, res, next) {
        const { userName, email, password, type,name } = req.body;
        try {
            // Check if user with the same email already exists
            const existingUser = await this.userRepository.checkUserByEmail({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use"});
            }
            else {
                const user = await this.userRepository.signUp({ name, email, password, type });
                return res.status(201).json({ message: "User created successfully", data: user });
            }
        } catch (error) {
            console.log("Controller: Error in SignUp", error);
            res.status(500).json({ error: "An error occurred during sign-up controller" });
        }
    }

    async userLogin(req, res, next) {
        const { email, password, type='customer' } = req.body;
        try {
            const user = await this.userRepository.singin({ email });
            if (!user) return res.status(400).json({ message: "Invalid Credentials" });
            else {
                const validUser= await bcrypt.compare(password, user.password);
                if(!validUser) return res.status(400).json({ message: "Invalid Credentials" });
                else if(user.type!==type) return res.status(400).json({ message: `User is not a ${type}` });
                else{
                    const token=jwt.sign({ id: user._id, email: user.email, type: user.type },process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.status(200).cookie("userToken", token, {
                        maxAge: 60 * 60 * 1000
                    }).send({ msg: "Login Successfull", cookie: token });
                }
            }
        } catch (error) {
            console.log("Controller: Error in Login", error);
            res.status(500).json({ error: "An error occurred during login controller" });
        }
    }


}


export default UserController;