import mongoose, { Types } from "mongoose";

export interface ILogin extends mongoose.Document{
    NickName: String;
    Password: string;
}


const LoginSchema= new mongoose.Schema({
    NickName: {type: String, required: true},
    Password: {type: String, required: true},
});

export const Login = mongoose.model<ILogin>("Login",LoginSchema);

