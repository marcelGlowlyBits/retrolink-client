import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createListing = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        price: v.number(),
        category: v.string(),
        condition: v.string(),
        platform: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("listings", {
            title: args.title,
            description: args.description,
            price: args.price,
            category: args.category,
            condition: args.condition,
            platform: args.platform,
        })
    }
})

export const getListings = query({
    handler: async(ctx) => {
        return await ctx.db.query("listings").collect();
    }
})