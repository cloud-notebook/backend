import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../config/customErrorHandler";
import User from "../entities/User";




export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await req.body.user;
        const profile = await User.findById(user._id).select("-password");
        res.json({
            success: true,
            profile
        })
    } catch (error: any) {
        next(new ErrorHandler(error.message, 404))
    }
}
