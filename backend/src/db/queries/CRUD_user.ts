import { db } from "../connectDB";
import type { NewUser } from "../schema/user";
import user from "../schema/user";

// create user
export const createUser = async (data: NewUser)=>{
    const [new_user] = await db.insert(user).values(data).returning()
    return new_user;
}

