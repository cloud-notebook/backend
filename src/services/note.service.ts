import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../config/customErrorHandler";
import Note from "../entities/Note";


export class NoteService {
    async addNote(req: Request, res: Response, next: NextFunction) {
        try {
            const { _id } = await req.body.user;
            console.log(_id)
            const { title, description, isPublic, tag } = req.body;
            const newNote = await Note.create({
                title,
                description,
                tag,
                isPublic,
                user: _id
            });

            return res.json({
                success: true,
                note: newNote
            })
        }
        catch (e: any) {
            return next(new ErrorHandler(e.message, 404))
        }
    }

    async updateNote(req: Request, res: Response, next: NextFunction) {
        try {
            const { _id } = await req.body.user;

            const { title, description, isPublic } = req.body;

            const note = await Note.findById(req.params.id);

            if (note) {
                if (note.user?.toString() !== _id.toString()) {
                    return next(new ErrorHandler("You are not the owner of this note", 400));
                }
            }

            if (!note) return next(new ErrorHandler("Note not found", 404));


            const newNote = await Note.findByIdAndUpdate(req.params.id, {
                title,
                description,
                isPublic,
                user: _id
            }, {
                new: true,
                runValidators: true,
            });
            res.json({
                success: true,
                note: newNote
            })
        }
        catch (e: any) {
            next(new ErrorHandler(e.message, 404))
        }
    }

    async deleteNote(req: Request, res: Response, next: NextFunction) {
        try {
            const { _id } = await req.body.user;

            const note = await Note.findById(req.params.id);

            // check if note belongs to user
            if (note) {
                if (note.user?.toString() !== _id.toString()) {
                    return next(new ErrorHandler("You are not the owner of this note", 400));
                }
            }

            if (!note) return next(new ErrorHandler("Note not found", 404));

            await Note.findByIdAndDelete(req.params.id);
            res.json({
                success: true,
                note: note
            })
        }
        catch (e: any) {
            return next(new ErrorHandler(e.message, 404))
        }
    }

    async getNotes(req: Request, res: Response, next: NextFunction) {
        try {
            const { _id } = await req.body.user;

            const notes = await Note.find({ user: _id });
            res.json({
                success: true,
                notes
            })
        }
        catch (e: any) {
            return next(new ErrorHandler(e.message, 404))
        }
    }

    async getNote(req: Request, res: Response, next: NextFunction) {
        try {
            const { _id } = await req.body.user;

            const note = await Note.findById(req.params.id);

            if (!note) return next(new ErrorHandler("Note not found", 404));
            res.json({
                success: true,
                note
            })
        }
        catch (e: any) {
            return next(new ErrorHandler(e.message, 404))
        }
    }

    publicNote = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const notes = await Note.find({ isPublic: true }).populate('user', '-password')
            res.json({
                success: true,
                notes
            })
        }

        catch (e: any) {
            return next(new ErrorHandler(e.message, 404))
        }
    }

    async searchNote(req: Request, res: Response, next: NextFunction) {
        try {
            const { s } = req.query;

            // @ts-ignore
            const notes = await Note.find({ $text: { "$search": s } }).populate('user');
            res.json({
                success: true,
                notes
            })
        }
        catch (e: any) {
            return next(new ErrorHandler(e.message, 404))
        }
    }

}