import { eq, ne } from "drizzle-orm";
import { db } from "../connectDB";
import like from "../schema/like";
import repost from "../schema/repost";
import save from "../schema/save";
import post from "../schema/post"
import follow from "../schema/follow";

const postCounts = {
    numLikes: (t: typeof post) => db.$count(like, eq(like.postId, t.id)),
    numReposts : (t: typeof post) => db.$count(repost, eq(repost.postId, t.id)),
    numSaves: (t: typeof post) => db.$count(save, eq(save.postId, t.id)),
};

const getPost= {
    columns: {
        id:true,
        content:true,
        createdAt:true
    },
    extras: postCounts,
    with:{
        author:{
            columns:{
                id:true,
                name:true,
                profilePicUrl:true
            }
        },
        media:{
            columns:{
                id:true,
                url:true
            }
        },quotedPost:{
            columns: {
                id:true,
                content:true,
                createdAt:true
            },
            extras: postCounts,
            with:{
                author:{
                    columns:{
                        id:true,
                        name:true,
                        profilePicUrl:true
                    }
                },
                media:{
                    columns:{
                        id:true,
                        url:true
                    }
                }
            }
        }    
    }
} as const

// info about user
export const userInfo = async (userId:string)=>{
    return await db.query.user.findFirst({
        columns:{
            id:true,
            name:true,
            profilePicUrl:true,
            bannerPicUrl:true,
            about:true,
            createdAt:true
        },
        where:{
            id:userId
        }
    })
}

// get post of user
export const myPost = async (userId: string)=>{
    return await db.query.post.findMany({
        columns: {
            id:true,
            content:true,
            createdAt:true
        },
        extras: postCounts,
        with:{
            media:{
                columns:{
                    id:true,
                    url:true
                }
            },quotedPost:{
                columns: {
                    id:true,
                    content:true,
                    createdAt:true
                },
                extras: postCounts,
                with:{
                    author:{
                        columns:{
                            id:true,
                            name:true,
                            profilePicUrl:true
                        }
                    },
                    media:{
                        columns:{
                            id:true,
                            url:true
                        }
                    }
                }
            }    
        },where:{
            authorId: userId,
            parentPostId: { isNull: true}
        }, orderBy:{
            createdAt : "desc",
            id : "desc"
        }
    })
}

export const postCount = async (userId: string) =>
    await db.$count(post, eq(post.authorId, userId));

// get replies by user
export const myReply = async (userId: string)=>{
    return await db.query.post.findMany({
        columns: {
            id:true,
            content:true,
            createdAt:true
        },
        extras:postCounts,
        with:{
            author:{
                columns:{
                    id:true,
                    name:true,
                    profilePicUrl:true
                }
            },
            media:{
                columns:{
                    id:true,
                    url:true
                }
            },
            parentPost:{
                columns:{
                    id:true,
                    content:true,
                    createdAt:true
                },
                extras:postCounts,
                with:{
                    author:{
                        columns:{
                            id:true,
                            name:true,
                            profilePicUrl:true
                        }
                    },
                    media:{
                        columns:{
                            id:true,
                            url:true
                        }
                    },
                }
            }
        },where:{
            authorId: userId,
            parentPostId: { isNotNull: true},
            parentPost:{
                authorId: {ne : userId}
            }
        }, orderBy:{
            createdAt : "desc",
            id : "desc"
        }
    })
}

// get repost of user
export const myRepost = async (userId: string)=>{
    return await db.query.repost.findMany({
        columns: {
            id:true
        },with:{
            post:getPost
        },where:{
            userId: userId,
        },orderBy:{
            createdAt: "desc",
            id: "desc"
        }
        
    })
}

// get like of user
export const myLike = async (userId: string)=>{
    return await db.query.like.findMany({
        columns: {
            id:true
        },with:{
            post:getPost
        },where:{
            userId: userId,
        },orderBy:{
            createdAt: "desc",
            id: "desc"
        }
        
    })
}

// get saves of user
export const mySave = async (userId: string)=>{
    return await db.query.save.findMany({
        columns: {
            id:true
        },with:{
            post:getPost
        },where:{
            userId: userId,
        },orderBy:{
            createdAt: "desc",
            id: "desc"
        }
        
    })
}

// get media of user
export const myMedia = async (userId: string)=>{
    return await db.query.media.findMany({
        columns: {
            id:true,
            url:true
        },where:{
            user_id: userId,
        },orderBy:{
            createdAt: "desc",
            id: "desc"
        }
    })
}

// get followers and following of likeuser
export const followers = async (userId: string)=>{
    return await db.query.follow.findMany({
        columns: { id: true, createdAt: true },
        where:{
            followingId:userId,
        },with:{
            follower:{
                columns:{
                    id:true,
                    name:true,
                    profilePicUrl:true
                }
            }
        }
    })
} 
export const followerCount = async (userId: string) =>
    await db.$count(follow, eq(follow.followingId, userId));

export const following = async (userId: string)=>{
    return await db.query.follow.findMany({
        columns: { id: true, createdAt: true },
        where:{
            userId,
        },with:{
            followee:{
                columns:{
                    id:true,
                    name:true,
                    profilePicUrl:true
                }
            }
        }
    })
} 

export const followingCount = async (userId: string) =>
    await db.$count(follow, eq(follow.userId, userId));