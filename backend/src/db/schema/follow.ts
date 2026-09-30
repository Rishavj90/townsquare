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

export const followRelations = defineRelations({ user, follow }, (r) => ({
    follow: {
      user: r.one.user({
        from: r.follow.userId,
        to: r.user.id,
        alias: "follower",
      }),

      following: r.one.user({
        from: r.follow.followingId,
        to: r.user.id,
        alias: "following",
      }),
    },

    user: {
      followers: r.many.follow({
        from: r.user.id,
        to: r.follow.userId,
        alias: "followers",
      }),

      following: r.many.follow({
        from: r.user.id,
        to: r.follow.followingId,
        alias: "following",
      }),
    },
  })
);

export default follow;