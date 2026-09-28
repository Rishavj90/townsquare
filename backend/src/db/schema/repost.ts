import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import user from "./user"
import post from "./post"

const repost = pgTable("repost", {
    id : uuid("id").primaryKey(),
    userId : uuid("user_id").references(()=>user.id),
    postId : uuid("post_id").references(()=>post.id),
    createdAt : timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export default repost;