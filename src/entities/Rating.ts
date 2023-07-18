import { Schema, model, Types } from 'mongoose';


const schema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
    },
    note: {
        type: Types.ObjectId,
        ref: 'Note',
    },
    star: {
        type: Number,
        default: 0,
    },
    comment: {
        type: String,
        default: '',
    },
},
    {
        timestamps: true
    });

export default model('Review', schema);