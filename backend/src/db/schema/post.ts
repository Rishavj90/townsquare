import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import user from "./user"

const post = pgTable("post", {
    id : uuid("id").primaryKey(),
    authorId : text("user_id").references(()=>user.id),
    parentPostId : uuid("parentPostId").references(():any=>post.id),
    quotePostId : uuid("QuotePostId").references(():any=>post.id),
    content : text("text"),
    createdAt : timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt : timestamp("updated_at", { mode: "date" }).defaultNow(),
    deletedAt : timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export default post;