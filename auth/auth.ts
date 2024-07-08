import NextAuth, { type DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "./lib/db"
import { getUserbyId } from "./data/user";

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
      user: {
        /** The user's postal address. */
        role: string
      } & DefaultSession["user"]
    }
  }
 
export const { 
    auth, 
    handlers, 
    signIn, 
    signOut 
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: {
                    id : user.id 
                },
                data : {
                    emailVerified: new Date()
                }
            });
        }
    },
    callbacks: {
        async signIn( {user, account}) {
            if( account?.provider !== "credentials") return true;

            const existingUser = await getUserbyId( user.id );
            
            // email not verified
            if( !existingUser?.emailVerified) return false; 

            return true;
        },
        async jwt( {token, account }) {
            if( !token.sub) return token;

            const existingUser = await getUserbyId( token.sub );

            if (!existingUser) return token;

            console.log(existingUser)

            token.role = existingUser.role;
            return token;
        },
        async session({session,token, user}) {
            console.log(session);
            console.log(token);
            if( token.sub && session.user) session.user.id = token.sub;
            if( token.role && session.user)
            session.user.role = token.role as string;
            return session;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});