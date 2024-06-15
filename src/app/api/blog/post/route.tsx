import { createPost, getPostIdBySlug, slugExists } from "@/lib/blog";
import { getPrisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

function isSlugValid(slug: string): boolean {
    if(!slug) {
        return false;
    }

    let regex = new RegExp("^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$");
    let result = regex.test(slug);

    if(!result) {
        return false;
    }

    return true;
}

export async function POST(req: NextRequest) {
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

    if(!isSlugValid(slug)) {
        return NextResponse.json({
            message: "Slugs should only contain alphanumeric characters with dashes and no spaces."
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

    let coverImage = data.get("cover-image") as File;
    if(coverImage) {
        let buffer = Buffer.from(await coverImage.arrayBuffer());
        try {
            // TODO: (SECURITY) Generate a guid as file name and map it in database to protect against path traversal.
            await writeFile(path.join(process.cwd(), `public/images/post/${slug}.png`), buffer);
        }
        catch(error) {
            console.log(`Failed to upload cover image with error ${error}`);

            return NextResponse.json({ 
                message: "An internal error occured while uploading cover image."
            }, { status: 500 });
        }
    }

    return NextResponse.json({ 
        message: "Post created"
    }, { status: 200 });
}

export async function PUT(req: NextRequest) {
    let data: FormData = await req.formData();
    
    let slug = data.get("slug")?.toString();
    if(!slug || slug == undefined) {
        return NextResponse.json({
            message: "You must supply a slug."
        }, { status: 400 });
    }

    let id = await getPostIdBySlug(slug);
    if(id == null) {
        return NextResponse.json({
            message: "No post exists with that slug."
        }, { status: 400 });
    }

    let prisma = getPrisma();

    let content = data.get("content")?.toString();
    if(content) {
        await prisma.post.update({
            where: {
                id: id
            },
            data: {
                content: content
            }
        });
    }

    return NextResponse.json({ 
        message: "Post updated"
    }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
    let data: FormData = await req.formData();
    
    let slug = data.get("slug")?.toString();
    if(!slug || slug == undefined) {
        return NextResponse.json({
            message: "You must supply a slug."
        }, { status: 400 });
    }

    let id = await getPostIdBySlug(slug);
    if(id == null) {
        return NextResponse.json({
            message: "No post exists with that slug."
        }, { status: 400 });
    }

    let prisma = getPrisma();

    let result = await prisma.post.delete({
        where: {
            id: id
        }
    });

    if(result == null) {
        return NextResponse.json({
            message: "No post exists with that slug."
        }, { status: 400 });
    }

    return NextResponse.json({ 
        message: "Post deleted"
    }, { status: 200 });
}