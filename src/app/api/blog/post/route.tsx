import { createPost, slugExists } from "@/lib/blog";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    let data: FormData = await req.formData();

    let title = data.get("title")?.toString();
    if(!title || title == undefined) {
        return NextResponse.json({
            message: "You must supply a title."
        }, { status: 400 });
    }

    let slug = data.get("slug")?.toString();
    if(!slug || slug == undefined) {
        return NextResponse.json({
            message: "You must supply a slug."
        }, { status: 400 });
    }

    if(await slugExists(slug)) {
        return NextResponse.json({
            message: "A post with that slug already exists."
        }, { status: 400 });
    }

    let shortContent = data.get("short-content")?.toString();
    if(!shortContent || shortContent == undefined) {
        return NextResponse.json({
            message: "You must supply short content."
        }, { status: 400 });
    }

    let content = data.get("content")?.toString();
    if(!content || content == undefined) {
        return NextResponse.json({
            message: "You must supply content."
        }, { status: 400 });
    }

    let isFeatured = false;
    let featured = data.get("is-featured")?.toString();

    if(featured && featured != undefined && featured === 'on') {
        isFeatured = true;
    }

    let result = await createPost(title, slug, shortContent, content, isFeatured); 
    if(!result) {
        return NextResponse.json({ 
            message: "An internal error occured."
        }, { status: 500 });
    }

    return NextResponse.json({ 
        message: "Post Submitted"
    }, { status: 200 });
}