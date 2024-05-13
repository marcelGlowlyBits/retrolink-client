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
    hasDamage: v.boolean(),
    damageDescription: v.optional(v.string()),
    payForShipping: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("listings", {
      title: args.title,
      description: args.description,
      price: args.price,
      category: args.category,
      condition: args.condition,
      platform: args.platform,
      damageDescription: args.damageDescription,
      hasDamage: args.hasDamage,
      payForShipping: args.payForShipping,
    });
  },
});

export const getListings = query({
  handler: async (ctx) => {
    return await ctx.db.query("listings").collect();
  },
});
