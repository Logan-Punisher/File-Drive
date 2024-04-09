import { ConvexError, v } from "convex/values";
import { mutation, query} from "./_generated/server"

export const createFile = mutation({
    args: {
        name: v.string()
    },
    async handler(ctx, args) {
        const identity= await ctx.auth.getUserIdentity();
        if (!identity){
            throw new ConvexError(' You Must Log-in to Upload File')

        }

        await ctx.db.insert('files',{
            name: args.name,
        })
    },
});


export const getFiles = query({
    args: {},
    async handler(ctx, args) {
        const identity= await ctx.auth.getUserIdentity();

        if(!identity){
            return[];
        }


        return ctx.db.query('files').collect()

    }
})


