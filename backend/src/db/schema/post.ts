import { pgTable, text, timestamp, uuid, type AnyPgColumn } from "drizzle-orm/pg-core";
import user from "./user"
import { defineRelations } from "drizzle-orm";

const post = pgTable("post", {
    id : uuid("id").primaryKey(),
    authorId : text("user_id").notNull().references(()=>user.id),
    parentPostId : uuid("parentPostId").references(():AnyPgColumn => post.id),
    quotePostId : uuid("QuotePostId").references(():AnyPgColumn => post.id),
    content : text("text"),
    createdAt : timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt : timestamp("updated_at", { mode: "date" }).defaultNow(),
    deletedAt : timestamp("deleted_at", { mode: "date" })
});

export type Post = typeof post.$inferSelect
export type NewPost = typeof post.$inferInsert

export const postRelation = defineRelations({post, user}, (r)=>({
    post:{
        parent: r.one.post({
            from: r.post.parentPostId,
            to:r.post.id
        }),
        quote: r.one.post({
            from: r.post.quotePostId,
            to:r.post.id
        }),
        author: r.one.user({
            from:r.post.authorId,
            to: r.user.id
        })
    },
    user:{
        post: r.many.post({
            from: r.user.id,
            to: r.post.authorId
        })
    }
}))

export default post;