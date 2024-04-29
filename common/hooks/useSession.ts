import { useConvexAuth } from "convex/react";

export function useSession() {
    return useConvexAuth();
  }