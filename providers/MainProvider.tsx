"use client"
import { type ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";

import { ConvexProviderWithClerk } from "convex/react-clerk";

import { ToastController} from "@/controller/toastController";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function MainProvider({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        >
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}> 
              {children}            
          </ConvexProviderWithClerk>
          <ToastController id="notifications" />
        </ClerkProvider>
        </>
    )
}
