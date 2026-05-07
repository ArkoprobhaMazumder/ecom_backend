import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
            },
            message: "Password should be at least 8 characters long and have a special character"
        }
    },
    type:{
        type: String,
        enum: ['provider', 'customer'],
        required: true
    }
});

// The Pre-Save Hook
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    // if (!this.isModified('password')) return next();

    try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        // next();
    } catch (error) {
        // next(error);
        console.log("Error in hashing password", error);
    }
});

const UserModel = mongoose.model('Users', userSchema);
export default UserModel;