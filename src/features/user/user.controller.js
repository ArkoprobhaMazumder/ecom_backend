
import UserRepository from "./user.repository.js";

class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async userSignUp(req, res, next) {
        const { name, email, password, type } = req.body;
        try {
            // Check if user with the same email already exists
            const existingUser = await this.userRepository.checkUserByEmail({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
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
        const { email, password } = req.body;
    }

}


export default UserController;