import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../config/customErrorHandler";
import Chat from "../entities/Chat";


export const accessChat = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
        const { userId } = req.body;
        const user = await req.body.user;

        if (!user) return next(new ErrorHandler("User not found", 404));

        if (!userId) return next(new ErrorHandler("User ID not found", 404));

        let chat = await Chat.findOne({ users: { $elemMatch: { $eq: userId } } });

        if (chat) return next(new ErrorHandler("You are already in a chat", 400));

        chat = await Chat.create({
            users: [user._id, userId],
        });
        res.status(200).json(chat);
    }
    catch (e: any) {
        return next(new ErrorHandler(e.message, 404));
    }
}

export const allChats = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
        const user = await req.body.user;
        const chats = await Chat.find({
            users: { $elemMatch: { $eq: user._id } }
        }).populate('lastMessage');
        res.status(200).json({
            success: true,
            chats
        });
    }
    catch (e: any) {
        return next(new ErrorHandler(e.message, 404));
    }
}

