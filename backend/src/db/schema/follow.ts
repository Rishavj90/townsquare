import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";
import user from "./user"

const follow = pgTable("follow", {
    id : uuid("id").primaryKey(),
    userId : text("user_id").references(()=>user.id, {onDelete : "cascade"}),
    followingId : text("following_id").references(()=>user.id, {onDelete : "cascade"}),
    createdAt : timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export default follow;