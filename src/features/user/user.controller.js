import { Component } from "react";
import UserRepository from "./user.repository.js";

class UserController extends Component{

    constructor(){
        this.userRepository = new UserRepository();
    }

    async userSignUp(req, res){
        try {
            const { name, email, password } = req.body;
        } catch (error) {
            res.status(500).json({ error: "An error occurred during sign-up" });
        }
    }

}


export default UserController;