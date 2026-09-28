import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import user from "./user"
import post from "./post";

const media = pgTable("media", {
    id : uuid("id").primaryKey(),
    user_id : text("user_id").references(()=>user.id, {onDelete : "cascade"}),
    post_id : uuid("post_id").references(()=>post.id, {onDelete : "cascade"}),
    name : text("name"),
    type: text("type"),
    createdAt : timestamp("created_at", { mode: "date" }).defaultNow(),
    updatedAt : timestamp("updated_at", { mode: "date" }).defaultNow()
});

export default media