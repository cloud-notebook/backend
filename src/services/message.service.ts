import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../config/customErrorHandler";
import Chat from "../entities/Chat";
import Message from "../entities/Message";
import User from "../entities/User";



export const sendMessage = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
        const user = await req.body.user
        const { chatId, content } = req.body;
        const chat = await Chat.findById(chatId);
        if (!chat) return next(new ErrorHandler("Chat not found", 404));
        //update latest message from chat

        let message = await Message.create({
            sender: user._id,
            content,
            chat: chatId
        })

        message = await message.populate("sender", "-password");
        message = await message.populate("chat");
        message = await message.populate("chat.users", "-password");
        const latestMessage = await Chat.findByIdAndUpdate(chatId, {
            lastMessage: message
        })
        console.log(latestMessage)
        res.status(200).json(message);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 404));
    }
}


export const getAllMessages = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
        const chatId = req.params.chatId;
        const messages = await Message.find({ chat: chatId });
        res.status(200).json(messages);
    } catch (e: any) {
        return next(new ErrorHandler(e.message, 404));
    }
}


export const deleteMessage = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
        const { messageId } = req.params;
        const message = await Message.findById(messageId);
        if (!message) return next(new ErrorHandler("Message not found", 404));
        await message.remove();
        res.status(200).json(message);
    } catch (e: any) {
        return next(new ErrorHandler(e.message, 404));
    }
}

