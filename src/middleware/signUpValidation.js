import { body, validationResult } from "express-validator";

export default async function signUpValidation(req, res, next) {

    const rules = [
        body('name').notEmpty().withMessage("Name is required").isLength({ min: 2, max: 20 }).withMessage("Name should be between 2 and 20 characters"),
        body('email').notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
        body('password').notEmpty().withMessage("Password is required").isLength({ min: 8 }).withMessage("Password should be at least 8 characters long").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage("Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
        body('type').notEmpty().withMessage("User type is required").isIn(['provider', 'customer']).withMessage("User type must be either 'provider' or 'customer'")
    ];

    await Promise.all(rules.map(v=>v.run(req)));
    let validationErrors=validationResult(req);

    if(!validationErrors.isEmpty()){
        return res.status(400).json({ errors: validationErrors.array()[0].msg });
    }
    next();
}

