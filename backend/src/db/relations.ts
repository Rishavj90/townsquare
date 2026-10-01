import { defineRelations } from "drizzle-orm";
import user from "./schema/user";
import post from "./schema/post";
import follow from "./schema/follow";
import like from "./schema/like";
import media from "./schema/media";
import repost from "./schema/repost";
import save from "./schema/save";

const relations = defineRelations(
  { user, post, follow, like, media, repost, save },
  (r) => ({
    user: {
      // rows where someone follows this user
      followers: r.many.follow({
        from: r.user.id,
        to: r.follow.followingId,
        alias: "followers",
      }),
      // rows where this user follows someone
      following: r.many.follow({
        from: r.user.id,
        to: r.follow.userId,
        alias: "following",
      }),
      posts: r.many.post({
        from: r.user.id,
        to: r.post.authorId,
      }),
      likes: r.many.like({
        from: r.user.id,
        to: r.like.userId,
      }),
      media: r.many.media({
        from: r.user.id,
        to: r.media.user_id,
      }),
      reposts: r.many.repost({
        from: r.user.id,
        to: r.repost.userId,
      }),
      saves: r.many.save({
        from: r.user.id,
        to: r.save.userId,
      }),

      // direct many-to-many via join tables
      likedPosts: r.many.post({
        from: r.user.id.through(r.like.userId),
        to: r.post.id.through(r.like.postId),
        alias: "likedPosts",
      }),
      savedPosts: r.many.post({
        from: r.user.id.through(r.save.userId),
        to: r.post.id.through(r.save.postId),
        alias: "savedPosts",
      }),
    },

    post: {
      author: r.one.user({
        from: r.post.authorId,
        to: r.user.id,
        optional: false,
      }),
      parentPost: r.one.post({
        from: r.post.parentPostId,
        to: r.post.id,
        alias: "parent",
      }),
      replies: r.many.post({
        from: r.post.id,
        to: r.post.parentPostId,
        alias: "parent",
      }),
      quotedPost: r.one.post({
        from: r.post.quotePostId,
        to: r.post.id,
        alias: "quote",
      }),
      quotes: r.many.post({
        from: r.post.id,
        to: r.post.quotePostId,
        alias: "quote",
      }),
      likes: r.many.like({
        from: r.post.id,
        to: r.like.postId,
      }),
      media: r.many.media({
        from: r.post.id,
        to: r.media.post_id,
      }),
      reposts: r.many.repost({
        from: r.post.id,
        to: r.repost.postId,
      }),
      saves: r.many.save({
        from: r.post.id,
        to: r.save.postId,
      }),
    },

    follow: {
      follower: r.one.user({
        from: r.follow.userId,
        to: r.user.id,
        alias: "following",
        optional: false,
      }),
      followee: r.one.user({
        from: r.follow.followingId,
        to: r.user.id,
        alias: "followers",
        optional: false,
      }),
    },

    like: {
      user: r.one.user({
        from: r.like.userId,
        to: r.user.id,
        optional: false,
      }),
      post: r.one.post({
        from: r.like.postId,
        to: r.post.id,
        optional: false,
      }),
    },

    media: {
      user: r.one.user({
        from: r.media.user_id,
        to: r.user.id,
        optional: false,
      }),
      post: r.one.post({
        from: r.media.post_id,
        to: r.post.id,
      }),
    },

    repost: {
      user: r.one.user({
        from: r.repost.userId,
        to: r.user.id,
        optional: false,
      }),
      post: r.one.post({
        from: r.repost.postId,
        to: r.post.id,
        optional: false,
      }),
    },

    save: {
      user: r.one.user({
        from: r.save.userId,
        to: r.user.id,
        optional: false,
      }),
      post: r.one.post({
        from: r.save.postId,
        to: r.post.id,
        optional: false,
      }),
    },
  })
);

export default relations;