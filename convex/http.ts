import { httpRouter } from "convex/server";

import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
    path: "/clerk",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
      const payloadString = await request.text();
      const headerPayload = request.headers;
  
      try {
        const result = await ctx.runAction(internal.clerk.fulfill, {
          payload: payloadString,
          headers: {
            "svix-id": headerPayload.get("svix-id")!,
            "svix-timestamp": headerPayload.get("svix-timestamp")!,
            "svix-signature": headerPayload.get("svix-signature")!,
          },
        });

        console.log('result', result.data);
  
        switch (result.type) {
          case "user.created":
            await ctx.runMutation(internal.users.createUser, {
              email: result.data.email_addresses[0]?.email_address,
              userId: result.data.id,
              username: result?.data?.username || '',
              image_url: result?.data.image_url 
            });
            break;
        }
  
        return new Response(null, {
          status: 200,
        });
      } catch (err) {
        console.error(err);
        return new Response("Webhook Error", {
          status: 400,
        });
      }
    })
    });

    export default http;