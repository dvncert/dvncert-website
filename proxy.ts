import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Next 16: "middleware" yerine "proxy" konvansiyonu.
// Edge-güvenli auth (DB içermez) ile /admin alanını korur.
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/admin/:path*"],
};
