import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../config/customErrorHandler";
import Rating from "../entities/Rating";


export class RatingService {


    addRating = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.body.user;
            const { noteId, comment, star } = req.body;

            const rating = await Rating.findOne({ note: noteId, user: _id });

            if (rating) {
                return next(new ErrorHandler("You already rated this note", 400))
            }

            const newRating = await Rating.create({
                note: noteId,
                user: _id,
                comment,
                star
            })


            res.status(200).json({
                success: true,
                rating: newRating
            })


        } catch (error: any) {
            return next(new ErrorHandler(error.message, 404))
        }
    }

    getRating = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { noteId } = req.params;
            const ratings = await Rating.find({ note: noteId }).populate("user", "-password").populate("note");
            res.status(200).json({
                success: true,
                ratings
            })
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 404))
        }

    }

    deleteRating = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const rating = await Rating.findOne({ _id: req.params.noteId })

            if (!rating) return next(new ErrorHandler("Rating not found", 404))

            await rating.remove();

            res.status(200).json({
                success: true,
                message: "Rating deleted"
            })

        } catch (error: any) {
            return next(new ErrorHandler(error.message, 404))
        }
    }

}