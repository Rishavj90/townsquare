import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";
import user from "./user"
import post from "./post"

const like = pgTable("like", {
    id : uuid("id").primaryKey(),
    userId : text("user_id").references(()=>user.id, {onDelete : "cascade"}),
    postId : uuid("post_id").references(()=>post.id, {onDelete : "cascade"}),
    createdAt : timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export default like;