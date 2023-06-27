import { Schema, Types, model, } from 'mongoose';


const messageSchema = new Schema({
    sender: {
        type: Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
    },
    chat: {
        type: Types.ObjectId,
        ref: 'Chat',
    }
}, { timestamps: true });

export default model('Message', messageSchema);