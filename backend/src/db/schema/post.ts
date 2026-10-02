import { pgTable, text, timestamp, uuid, type AnyPgColumn } from "drizzle-orm/pg-core";
import user from "./user"

const post = pgTable("post", {
    id : uuid("id").primaryKey(),
    authorId : text("user_id").notNull().references(()=>user.id),
    parentPostId : uuid("parentPostId").references(():AnyPgColumn => post.id),
    quotePostId : uuid("QuotePostId").references(():AnyPgColumn => post.id),
    content : text("text"),
    createdAt : timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt : timestamp("updated_at", { mode: "date" }),
    deletedAt : timestamp("deleted_at", { mode: "date" })
});

export type Post = typeof post.$inferSelect
export type NewPost = typeof post.$inferInsert

export default post;