import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";
import user from "./user"
import { defineRelations } from 'drizzle-orm';

const follow = pgTable("follow", {
    id : uuid("id").primaryKey(),
    userId : text("user_id").references(()=>user.id, {onDelete : "cascade"}),
    followingId : text("following_id").references(()=>user.id, {onDelete : "cascade"}),
    createdAt : timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// userId : A, followingId : B
// each row means : A is following B

export type Follow = typeof follow.$inferSelect
export type NewFollow = typeof follow.$inferInsert 

export default follow;