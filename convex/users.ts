import { v } from "convex/values";

import { authQuery } from "./util";
import { internalMutation, query } from "./_generated/server";

export const createUser = internalMutation({
    args: {
        userId: v.string(),
        email: v.string(),
        username: v.string(),
        image_url: v.string(),
    },
    handler: async (ctx, args) => {
      const user = await ctx.db
        .query("users")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .first();
  
      if (user) return;
  
      await ctx.db.insert("users", {
        userId: args.userId,
        email: args.email,
        username: args.username,
        image_url: args.image_url,
      });
    },
  });

  export const getMyUser = authQuery({
    args: {},
    async handler(ctx, args) {
      return ctx.user;
    },
  });

  export const getProfile = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
      const user = await ctx.db
        .query("users")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .first();
      
      return user;
    },
  });