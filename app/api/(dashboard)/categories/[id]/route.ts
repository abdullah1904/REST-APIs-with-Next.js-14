import connection from "@/lib/db";
import Category from "@/lib/models/categoryModel";
import User from "@/lib/models/userModel";
import { ParamsInterface } from "@/types";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: ParamsInterface }) => {
    try {
        const { id } = params;
        await connection();
        if (!Types.ObjectId.isValid(id)) {
            return NextResponse.json({ 'message': 'Invalid category id' }, { status: 400 });
        }
        const category = await Category.findById(id);
        if (category) {
            return NextResponse.json({ 'message': 'Category found successfully', category }, { status: 200 });
        }
        else {
            return NextResponse.json({ 'message': 'Category not found' }, { status: 404 });
        }
    }
    catch (err: any) {
        return new NextResponse(err.message, { status: 500 });
    }
}