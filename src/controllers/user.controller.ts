import { NextFunction, Response, Request } from 'express';
import ErrorHandler from '../config/customErrorHandler';

class UserController {
    register(req: Request, res: Response, next: NextFunction) {
        const { name, email, password } = req.body;
        if (!req.body || (!name || !email || !password)) return next(new ErrorHandler("All fields Required", 400));

        return res.json({
            sucess: true,
            message: "Users Added"
        });

    }
}


export default UserController;