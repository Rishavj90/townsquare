import { eq } from "drizzle-orm";
import { db } from "../connectDB";
import type { NewUser } from "../schema/user";
import user from "../schema/user";

// create user
export const createUser = async (data: NewUser)=>{
    const [new_user] = await db.insert(user).values(data).returning()
    return new_user;
}

// delete user
export const deleteUser = async (userId : string)=>{
    return await db.delete(user).where(eq(user.id, userId)).returning()
}

// update about 
export const updateAbout = async (userId:string, about:string)=>{
    return await db.update(user).set({about}).where(eq(user.id, userId)).returning()
}

// update name
export const updateName = async (userId:string, name:string)=>{
    return await db.update(user).set({name}).where(eq(user.id, userId)).returning()
}

// update pfp
export const updatePfp = async (userId:string, profilePicUrl:string)=>{
    return await db.update(user).set({profilePicUrl}).where(eq(user.id, userId)).returning()
}

// update banner
export const updateBanner = async (userId:string, bannerPicUrl:string)=>{
    return await db.update(user).set({bannerPicUrl}).where(eq(user.id, userId)).returning()
}
