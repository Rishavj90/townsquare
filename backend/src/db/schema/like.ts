import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";
import user from "./user"
import post from "./post"
import { defineRelations } from "drizzle-orm";

const like = pgTable("like", {
    id : uuid("id").primaryKey(),
    userId : text("user_id").references(()=>user.id, {onDelete : "cascade"}),
    postId : uuid("post_id").references(()=>post.id, {onDelete : "cascade"}),
    createdAt : timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type Like = typeof like.$inferSelect
export type NewLike = typeof like.$inferInsert

export const likeRelation = defineRelations({like, user, post}, (r)=>({
    like:{
        likedBy:r.one.user({
            from: r.like.userId,
            to : r.user.id
        }),
        likePost:r.one.post({
            from: r.like.postId,
            to : r.post.id
        })
    },
    user:{
        user:r.many.like({
            from : r.user.id,
            to : r.like.userId
        })
    },
    post:{
        post: r.many.like({
            from : r.post.id,
            to : r.like.postId
        })
    }
}))

export default like;