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
    preferenceOfShipping: v.string(),
    payForShipping: v.optional(v.string()),
    images: v.array(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("listings", {
      title: args.title,
      description: args.description,
      price: args.price,
      category: args.category,
      condition: args.condition,
      platform: args.platform,
      hasDamage: args.hasDamage,
      damageDescription: args.damageDescription,
      preferenceOfShipping: args.preferenceOfShipping,
      payForShipping: args.payForShipping,
      images: args.images,
    });
  },
});

export const getListings = query({
  handler: async (ctx) => {
    return await ctx.db.query("listings").collect();
  },
});
