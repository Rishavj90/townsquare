import { db } from "../connectDB";

// get post of user
export const userPost = async (userId: string)=>{
    return await db.query.post.findMany({
        with: {author:true},
    })
}

// get repost of user
export const userRepost = async (userId : string)=>{
    return  
}

// get like of user


// get media of user


// get followers and following of user

