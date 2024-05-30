import { mutation, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";

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
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("listings", {
      userId: args.userId,
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

async function attachUrlToThumbnail(ctx: QueryCtx, listing: Doc<"listings">) {
  return {
    ...listing,
    urls: await Promise.all(
      listing.images.map((image) => ctx.storage.getUrl(image)),
    ),
  };
}

export const getListingsPerUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    console.log("args", args);
    const listings = await ctx.db
      .query("listings")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    return await Promise.all(
      listings.map((listing) => attachUrlToThumbnail(ctx, listing)),
    );
  },
});
