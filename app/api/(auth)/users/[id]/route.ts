import connection from "@/lib/db";
import User from "@/lib/models/userModel";
import { ParamsInterface } from "@/types";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req:Request,{params}:{params: ParamsInterface})=>{
    try{
        const {id} = params;
        await connection();
        const user = await User.findById(id);
        if(user){
            return NextResponse.json({'message':'User found successfully',user},{status:200});
        }
        else{
            return NextResponse.json({'message':'User not found'},{status:404});
        }
    }
    catch(err:any){
        return new NextResponse(err.message,{status:500});
    }
}

export const PUT = async (req:Request,{params}:{params: ParamsInterface})=>{
    try{
        const {id} = params;
        const {password} = await req.json();
        if(!password){
            return NextResponse.json({'message': "Please fill all the fields"},{status:400});
        }
        if(!Types.ObjectId.isValid(id)){
            return NextResponse.json({'message': "Invalid user id"},{status:400});
        }
        await connection();
        const updatedUser = await User.findByIdAndUpdate(id,{password});
        if(updatedUser){
            return NextResponse.json({'message':'User Updated successfully',"user":updatedUser},{status:200});
        }
        else{
            return NextResponse.json({'message':'User not found'},{status:404});
        }
    }
    catch(err:any){
        return new NextResponse(err.message,{status:500});
    }
}

export const DELETE = async (req:Request,{params}:{params:ParamsInterface})=>{
    try{
        const {id} = params;
        const deletedUser = await User.findByIdAndDelete(id);
        if(!Types.ObjectId.isValid(id)){
            return NextResponse.json({'message': "Invalid user id"},{status:400});
        }
        if(deletedUser){
            return NextResponse.json({'message':'User deleted successfully'},{status:200});
        }
        else{
            return NextResponse.json({'message':'User not found'},{status:404});
        }
    }
    catch(err:any){
        return new NextResponse(err.message,{status:500});
    }
}