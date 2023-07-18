import { NextFunction, Response, Request } from 'express';
import ErrorHandler from '../config/customErrorHandler';
import User from '../entities/User';
import generateToken from "../util/generateToken";

class AuthService {
    async register(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        const { name, username, email, password } = req.body;
        if (!req.body || (!name || !email || !password || !username)) return next(new ErrorHandler("All fields Required", 400));

        try {
            const user = await User.findOne({ email: email });
            if (user) return next(new ErrorHandler("User Already Exists", 400));
            const newUser = await User.create({
                name,
                username,
                email,
                password,
            })
            const token = `Bearer ${await generateToken(newUser._id)}`
            res.status(201).json({
                success: true,
                message: "User Register Successfully",
                token,
                user: newUser,
            })
        } catch (error: any) { return next(new ErrorHandler(error.message, 400)) }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        const { email, password } = req.body;
        if (!req.body || (!email || !password)) return next(new ErrorHandler("All fields Required", 400));

        try {
            const user = await User.findOne({ email });
            if (!user) return next(new ErrorHandler("Email Or Password Incorrect", 400));
            if (user.verifyPassword(password)) {
                const token = `Bearer ${await generateToken(user._id)}`
                res.json({
                    success: true,
                    message: "Login Successfully",
                    token,
                    user: {
                        _id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            }
            else return next(new ErrorHandler("Email Or Password Incorrect", 400));
        } catch (error: any) { return next(new ErrorHandler(error.message, 400)) }
    }
}


export default AuthService;