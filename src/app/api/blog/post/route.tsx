import { InputValidationType, Validator } from "@/lib/Validator";
import { createPost, deletePostById, getPostBySlug, postExistsWithSlug } from "@/lib/blog";
import { getPrisma } from "@/lib/prisma";
import { unlink, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest) {
    let data: FormData = await req.formData();

    let title = data.get("title")?.toString();
    let validTitle = Validator.validate(InputValidationType.BlogPostTitle, title);
    if(!validTitle.result) {
        return NextResponse.json({
            message: validTitle.message
        }, { status: 400 });
    }

    let slug = data.get("slug")?.toString();
    let validSlug = Validator.validate(InputValidationType.BlogPostSlug, slug);
    if(!validSlug.result) {
        return NextResponse.json({
            message: validSlug.message
        }, { status: 400 });
    }

    if(await postExistsWithSlug(slug!)) {
        return NextResponse.json({
            message: "A post with that slug already exists."
        }, { status: 400 });
    }

    let shortContent = data.get("short-content")?.toString();
    let validShortContent = Validator.validate(InputValidationType.BlogPostShortContent, shortContent);
    if(!validShortContent.result) {
        return NextResponse.json({
            message: validShortContent.message
        }, { status: 400 });
    }

    let content = data.get("content")?.toString();
    let validContent = Validator.validate(InputValidationType.BlogPostContent, content);
    if(!validContent.result) {
        return NextResponse.json({
            message: validContent.message
        }, { status:400 });
    }

    let isFeatured = false;
    let featured = data.get("is-featured")?.toString();

    if(featured && featured === 'on') {
        isFeatured = true;
    }

    let coverImage = data.get("cover-image") as File;
    let validCoverImage = Validator.validate(InputValidationType.BlogPostCoverImage, coverImage);
    if(!validCoverImage.result) {
        return NextResponse.json({
            message: validCoverImage.message
        }, { status: 400 });
    }

    let guid = crypto.randomUUID();
    let fileName = coverImage.name.toLowerCase();
    let fileExtension = fileName.split('.').pop()!;

    let result = await createPost({
        title: title!,
        slug: slug!,
        content: content!,
        shortContent: shortContent!,
        featured: isFeatured,
        coverImage: `${guid}.${fileExtension}`
    }); 

    if(!result) {
        return NextResponse.json({ 
            message: "An internal error occured."
        }, { status: 500 });
    }

    // Only create the image on disk if the post was created.
    if(coverImage) {
        let buffer = Buffer.from(await coverImage.arrayBuffer());
        try {
            let filePath = path.join(process.cwd(), `public/images/post/${guid}.${fileExtension}`);
            await writeFile(filePath, buffer);
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
    if(!slug || slug == undefined || slug.length < 1 || slug.length > 128) {
        return NextResponse.json({
            message: "You must supply a slug between 0 and 128 characters."
        }, { status: 400 });
    }

    let post = await getPostBySlug(slug);
    if(post == null) {
        return NextResponse.json({
            message: "No post exists with that slug."
        }, { status: 400 });
    }

    let prisma = getPrisma();

    let content = data.get("content")?.toString();
    if(content) {
        if(content.length < 1 || content.length > 65536) {
            return NextResponse.json({
                message: "You must supply content between 0 and 65,536 characters."
            }, { status: 400 });
        }

        await prisma.post.update({
            where: {
                id: post.id
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
    if(!slug || slug == undefined || slug.length < 1 || slug.length > 128) {
        return NextResponse.json({
            message: "You must supply a slug between 0 and 128 characters."
        }, { status: 400 });
    }

    let post = await getPostBySlug(slug);
    if(post == null) {
        return NextResponse.json({
            message: "No post exists with that slug."
        }, { status: 400 });
    }

    let result = await deletePostById(post.id);
    if(!result) {
        return NextResponse.json({
            message: "An internal error occured when deleting the post."
        }, { status: 500 });
    }

    try {
        let filePath = path.join(process.cwd(), `public/images/post/${post.coverImage}`);
        await unlink(filePath);
    }
    catch(error) {
        console.log(`An error occured while trying to delete cover image: ${error}`);
    }

    return NextResponse.json({ 
        message: "Post deleted"
    }, { status: 200 });
}