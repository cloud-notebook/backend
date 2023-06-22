import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';



const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, trim: true, lowercase: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });




UserSchema.methods.verifyPassword = function (password: string) {
    return bcrypt.compareSync(password, this.password);
}

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});


const User = model("user", UserSchema);
export default User;