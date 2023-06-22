import { Schema, model, Types } from 'mongoose';

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    tag: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Types.ObjectId,
        ref: 'user'
    },
    isPublic: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default model('Note', noteSchema);