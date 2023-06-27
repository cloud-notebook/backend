import { Schema, Types, model } from "mongoose";


const chatSchema = new Schema({
    chatName: {
        type: String,
        trim: true
    },
    users: [
        {
            type: Types.ObjectId,
            ref: "User"
        }
    ],
    lastMessage: {
        type: Types.ObjectId,
        ref: "Message"
    },
});


export default model("Chat", chatSchema);