import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import user from "./user"

const follow = pgTable("follow", {
    id : uuid("id").primaryKey(),
    userId : uuid("user_id").references(()=>user.id, {onDelete : "cascade"}),
    followingId : uuid("following_id").references(()=>user.id, {onDelete : "cascade"}),
    createdAt : timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export default follow;