import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";
import user from "./user"
import post from "./post"
import { defineRelations } from "drizzle-orm";

const save = pgTable("save", {
    id : uuid("id").primaryKey(),
    userId : text("user_id").references(()=>user.id, {onDelete : "cascade"}),
    postId : uuid("post_id").references(()=>post.id, {onDelete : "cascade"}),
    createdAt : timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type Save = typeof save.$inferSelect
export type NewSave = typeof save.$inferInsert

export const saveRelation = defineRelations({save, user, post}, (r)=>({
    save: {
        user: r.one.user({
            from: r.save.userId,
            to: r.user.id
        }),
        post: r.one.post({
            from: r.save.postId,
            to: r.post.id
        })
    },
    user: {
        user: r.many.save({
            from: r.user.id,
            to: r.save.userId 
        })
    },
    post: {
        post: r.many.save({
            from: r.post.id,
            to: r.save.postId 
        })
    }
}))

export default save;