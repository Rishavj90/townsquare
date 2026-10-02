import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import user from "./user"
import post from "./post";

const media = pgTable("media", {
    id : uuid("id").primaryKey().defaultRandom(),
    user_id : text("user_id").references(()=>user.id, {onDelete : "cascade"}),
    post_id : uuid("post_id").references(()=>post.id, {onDelete : "cascade"}),
    url: text("url").notNull(),
    name : text("name"),
    type: text("type"),
    createdAt : timestamp("created_at", { mode: "date" }).defaultNow(),
    updatedAt : timestamp("updated_at", { mode: "date" })
});

export type Media = typeof media.$inferSelect
export type NewMedia = typeof media.$inferInsert

export default media