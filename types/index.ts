import { Types } from "mongoose";

export interface CategoryModelInterface{
    title: string;
    user: Types.ObjectId;
}; 

export interface UserModelInterface{
    email: string;
    username: string;
    password: string;
};

export interface ParamsInterface{
    id: string;
};