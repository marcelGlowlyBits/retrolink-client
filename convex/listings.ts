import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createListing = mutation({
    args: {
        title: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("listings", {
            title: args.title,
        })
    }
})

export const getListings = query({
    handler: async(ctx) => {
        return await ctx.db.query('listings').collect();
    }
})