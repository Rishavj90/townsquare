import { pgTable, text, timestamp, uuid, type AnyPgColumn } from "drizzle-orm/pg-core";
import user from "./user"

const post = pgTable("post", {
    id : uuid("id").primaryKey().defaultRandom(),
    authorId : text("user_id").notNull().references(()=>user.id,{onDelete : "cascade"}),
    parentPostId : uuid("parentPostId").references(():AnyPgColumn => post.id),
    quotePostId : uuid("QuotePostId").references(():AnyPgColumn => post.id),
    content : text("text"),
    createdAt : timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type Post = typeof post.$inferSelect
export type NewPost = typeof post.$inferInsert

export default post;