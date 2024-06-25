import connection from "@/lib/db";
import Category from "@/lib/models/categoryModel";
import User from "@/lib/models/userModel";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req:Request)=>{
    try{
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        await connection();
        if(!userId){
            const categories = await Category.find().populate('User');
            return NextResponse.json(categories,{status: 200});
        }
        if(!Types.ObjectId.isValid(userId)){
            return NextResponse.json({'message': 'Invalid user id'},{status: 400});
        }
        const user = await User.findById(userId);
        if(!user){
            return NextResponse.json({'message': 'User not found'},{status: 404});
        }
        const categories = await Category.find({ user: userId }).populate('User');
        return NextResponse.json(categories,{status: 200});
    }
    catch(err:any){
        return new NextResponse(err.message,{status:500});
    }
}