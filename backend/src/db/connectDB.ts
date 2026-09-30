import { drizzle } from 'drizzle-orm/neon-http';
import { followRelations } from './schema/follow';
import { likeRelation } from './schema/like';
import { mediaRelations } from './schema/media';
import { postRelation } from './schema/post';
import { repostRelation } from './schema/repost';
import { saveRelation } from './schema/save';

export const db = drizzle(process.env.DATABASE_URL!,{
    relations : {
        ...followRelations,
        ...likeRelation,
        ...mediaRelations,
        ...postRelation,
        ...repostRelation,
        ...saveRelation
    }
});

console.log("DB connected")
