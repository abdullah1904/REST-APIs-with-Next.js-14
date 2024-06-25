import connection from "@/lib/db";
import User from "@/lib/models/userModel";
import { NextResponse } from "next/server"
import { use } from "react";

export const GET = async ()=>{
    try{
        await connection();
        const user = await User.find();
        return NextResponse.json({'message': 'OK','users': user},{status: 200});
    }
    catch(err:any){
        return new NextResponse(err.message,{status:500});
    }
}

export const POST = async (req:Request)=>{
    try{
        const {email,username,password} = await req.json();
        if(!email || !username || !password){
            return NextResponse.json({'message': "Please fill all the fields"},{status:400});
        }
        await connection();
        const checkUser = await User.findOne({email, username});
        if(checkUser){
            return NextResponse.json({'message': "User already exists"},{status:400});
        }
        const user = await User.create({email, username, password});
        return NextResponse.json({"message":"User created successfully", user},{status:201});
    }
    catch(err:any){
        return new NextResponse(err.message,{status:500});
    }
}