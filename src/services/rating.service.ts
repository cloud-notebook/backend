import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../config/customErrorHandler";
import Rating from "../entities/Rating";


class RatingService {


    addRating = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.body.user;
            const { noteId, comment, star } = req.body;

            const rating = await Rating.findOne({ noteId, userId: _id });

            if (rating) {
                return next(new ErrorHandler("You already rated this note", 400))
            }

            const newRating = await Rating.create({
                noteId,
                userId: _id,
                comment,
                star
            })



        } catch (error: any) {
            return next(new ErrorHandler(error.message, 404))
        }
    }

    getRating = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { noteId } = req.params;
            const rating = await Rating.find({ noteId });
            res.status(200).json({
                success: true,
                rating
            })
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 404))
        }

    }

    deleteRating = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const rating = await Rating.findOne({ _id: req.params.id })

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