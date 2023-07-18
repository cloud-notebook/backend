import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../config/customErrorHandler";
import Note from "../entities/Note";
import Rating from "../entities/Rating";



export class DashboardService {
    async userStatics(req: Request, res: Response, next: NextFunction) {
        try {
            const { _id } = await req.body.user;

            const totalNotes = await Note.find({ user: _id }).count();

            const publicNotes = await Note.find({ user: _id, isPublic: true }).count();

            const privateNotes = await Note.find({ user: _id, isPublic: false }).count();

            const reviewOnPublicNotes = await Rating.find({ user: _id }).count();

            const recentNotes = await Note.find({ user: _id }).sort({ _id: -1 }).limit(5);

            res.json({
                success: true,
                totalNotes,
                publicNotes,
                privateNotes,
                reviewOnPublicNotes,
                recentNotes
            })
        }

        catch (error: any) {
            return next(new ErrorHandler(error.message, 404))
        }
    }

}