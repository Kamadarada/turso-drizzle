import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import "dotenv/config";

export const requireAuth = ClerkExpressRequireAuth();
