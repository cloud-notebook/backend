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
        ref: 'User'
    },
    isPublic: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

noteSchema.index({ title: 'text', description: 'text' });

export default model('Note', noteSchema);