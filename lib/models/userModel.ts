import { Schema, model, models } from "mongoose";


export interface UserModelInterface{
    email: string;
    username: string;
    password: string;
}

const UserSchema = new Schema<UserModelInterface>({
    email: {type: "string", required: true, unique: true},
    username: {type: "string", required: true, unique: true},
    password: {type: "string", required: true},
},{timestamps: true});

const User = models.User || model('User',UserSchema);

export default User;