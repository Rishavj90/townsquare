import { and, eq } from "drizzle-orm";
import { db } from "../connectDB";
import type { NewLike } from "../schema/like";
import like from "../schema/like";
import type { NewMedia } from "../schema/media";
import media from "../schema/media";
import type { NewPost } from "../schema/post";
import post from "../schema/post";
import type { NewRepost } from "../schema/repost";
import repost from "../schema/repost";
import type { NewSave } from "../schema/save";
import save from "../schema/save";

export const newPost = async (postData:NewPost, mediaData:NewMedia)=>{
    const p = await db.insert(post).values(postData).returning()
    const m = await db.insert(media).values(mediaData).returning()
    return {
        post:p,
        media:m
    };
}

export const deletePost = async (postId:string)=>{
    return await db.delete(post).where(eq(post.id, postId)).returning()
}

export const newLike = async (data:NewLike)=>{
    return await db.insert(like).values(data).returning()
}

export const newRepost = async (data:NewRepost)=>{
    return await db.insert(repost).values(data).returning()
}

export const newSave = async (data:NewSave)=>{
    return await db.insert(save).values(data).returning()
}

export const deleteLike = async (userId:string, postId:string)=>{
    return await db.delete(like).where(and(
        eq(like.userId, userId),
        eq(like.postId, postId)
    )).returning()
}

export const deleteRepost = async (userId:string, postId:string)=>{
    return await db.delete(repost).where(and(
        eq(repost.userId, userId),
        eq(repost.postId, postId)
    )).returning()
}

export const deleteSave = async (userId:string, postId:string)=>{
    return await db.delete(save).where(and(
        eq(save.userId, userId),
        eq(save.postId, postId)
    )).returning()
}