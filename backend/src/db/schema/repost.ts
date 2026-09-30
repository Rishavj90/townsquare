import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";
import user from "./user"
import post from "./post"
import { defineRelations } from "drizzle-orm";

const repost = pgTable("repost", {
    id : uuid("id").primaryKey(),
    userId : text("user_id").references(()=>user.id, {onDelete : "cascade"}),
    postId : uuid("post_id").references(()=>post.id, {onDelete : "cascade"}),
    createdAt : timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type Repost = typeof repost.$inferSelect
export type NewRepost = typeof repost.$inferInsert

export const repostRelation = defineRelations({repost, user, post}, (r)=>({
    repost: {
        user: r.one.user({
            from: r.repost.userId,
            to: r.user.id
        }),
        post: r.one.post({
            from: r.repost.postId,
            to: r.post.id
        })
    },
    user: {
        user: r.many.repost({
            from: r.user.id,
            to: r.repost.userId 
        })
    },
    post: {
        post: r.many.repost({
            from: r.post.id,
            to: r.repost.postId 
        })
    }
}))

export default repost;