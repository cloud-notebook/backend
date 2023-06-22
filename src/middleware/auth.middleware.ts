import {NextFunction, Request, Response} from "express";
import ErrorHandler from "../config/customErrorHandler";
import jwt from "jsonwebtoken";
import User from "../entities/User";


const authMiddleware =async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            const token = req.headers.authorization.split(" ")[1];
            if(!token) return next(new ErrorHandler('Not Authorized', 401));
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {id: string};

            const user = await User.findById(decoded.id);

            if(!user) return next(new ErrorHandler('Not Authorized', 401));

            req.body.user = user;
            next();
        }
    }
    catch (e:any) {
        return next(new ErrorHandler(e.message,404))
    }
}

export default authMiddleware;