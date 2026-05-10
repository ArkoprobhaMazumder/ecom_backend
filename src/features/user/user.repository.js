
import UserModel from "./user.model.js";


class UserRepository{

    async signUp(user){
        try {
            const newUser = new UserModel(user);
            return await newUser.save();
        } catch (error) {
            console.log("Repo: Error in SignUp", error);
            throw error;
        }
    }

    async checkUserByEmail({ email }) {
        try {
            return await UserModel.findOne({ email });
        } catch (error) {
            console.log("Repo: Error while checking user by email", error);
            throw error;
        }
    }

    async singin(user){
        const { email } = user;
        try {
            return await UserModel.findOne({ email });
        } catch (error) {
            console.log("Repo: Error in SignIn", error);
            throw error;
        }
    }
}

export default UserRepository;