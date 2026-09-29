import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import user from "./user"
import post from "./post";
import { defineRelations } from "drizzle-orm";

const media = pgTable("media", {
    id : uuid("id").primaryKey(),
    user_id : text("user_id").references(()=>user.id, {onDelete : "cascade"}),
    post_id : uuid("post_id").references(()=>post.id, {onDelete : "cascade"}),
    name : text("name"),
    type: text("type"),
    createdAt : timestamp("created_at", { mode: "date" }).defaultNow(),
    updatedAt : timestamp("updated_at", { mode: "date" }).defaultNow()
});

export type Media = typeof media.$inferSelect
export type NewMedia = typeof media.$inferInsert

export const mediaRelations = defineRelations({media, user, post}, (r)=>({
    media:{
        uploadedBy: r.one.user({
            from: r.media.user_id,
            to : r.user.id
        }),
        post: r.one.post({
            from: r.media.post_id,
            to: r.post.id
        })
    },
    user:{
        user: r.many.media({
            from: r.user.id,
            to: r.media.user_id
        })
    },
    post:{
        post: r.many.media({
            from: r.post.id,
            to: r.media.post_id
        })
    }
}))

export default media