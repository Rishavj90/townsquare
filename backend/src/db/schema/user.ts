import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

const user = pgTable("user", {
    id : text("id").primaryKey(),
    name : text("name"),
    email : text("email").notNull().unique(),
    profilePicUrl : text("profilePicUrl"),
    bannerPicUrl : text("bannerPicUrl"),
    about : text("about"),
    createdAt : timestamp("created_at", { mode: "date" }).defaultNow(),
    updatedAt : timestamp("updated_at", { mode: "date" })
});

export type User = typeof user.$inferSelect
export type NewUser = typeof user.$inferInsert

export default user