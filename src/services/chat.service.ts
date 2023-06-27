import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../config/customErrorHandler";
import Chat from "../entities/Chat";


export const accessChat = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
        const { userId } = req.body;
        const user = await req.body.user;

        if (!user) return next(new ErrorHandler("User not found", 404));

        if (!userId) return next(new ErrorHandler("User ID not found", 404));

        const isChat = await Chat.find({
            $and: [{ users: { $elemMatch: { $eq: userId } } },
            { users: { $elemMatch: { $eq: user._id } } }]
        });

        if (isChat) {
            res.status(200).json(isChat);
            return;
        }
        const chat = new Chat({
            chatName: 'sender',
            users: [user._id, userId],
        });
        const createChat = await chat.save();
        const fullChat = await Chat.findById(createChat._id).populate("users", '-password');
        return res.status(200).json(fullChat);
    }
    catch (e: any) {
        return next(new ErrorHandler(e.message, 404));
    }
}



