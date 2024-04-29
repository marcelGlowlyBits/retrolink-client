import {
  MutationCtx,
  QueryCtx,
  mutation,
} from "./_generated/server";
import {
  customQuery,
  customCtx,
  customMutation,

} from "convex-helpers/server/customFunctions";
import { query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const authMutation = customMutation(
  mutation,
  customCtx(async (ctx) => ({ user: await getUserOrThrow(ctx) }))
);

export const authQuery = customQuery(
    query,
    customCtx(async (ctx) => {
      try {
        return { user: await getUserOrThrow(ctx) };
      } catch (err) {
        return { user: null };
      }
    })
  );

  async function getUserOrThrow(ctx: QueryCtx | MutationCtx) {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
  
    if (!userId) {
      throw new ConvexError("must be logged in");
    }
  
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();
  
    if (!user) {
      throw new ConvexError("user not found");
    }
  
    return user;
  }
  