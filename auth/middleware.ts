import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { DEFAULT_LOGIN_REDIRECT, publicRoutes, apiAuthPrefix, authRoutes } from "./route";
 
const { auth } = NextAuth(authConfig)
export default auth(async ( req ) => {
  // Your custom middleware logic goes here
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes( nextUrl.pathname);
    const isAuthRoute = authRoutes.includes( nextUrl.pathname);

    console.log(
        `isApiAuthRoute: ${isApiAuthRoute}, 
        isPublicRoute: ${isPublicRoute},
        isLoggedIn: ${isLoggedIn}`
    )

    if( isApiAuthRoute ) {
        return ;
    }

    if( isAuthRoute ) {
         if( isLoggedIn ) {
            return Response.redirect(
                new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)
            )
         }
        return;
    }

    if( !isLoggedIn && !isPublicRoute) {
        return Response.redirect(
            new URL("/auth/login", nextUrl)
        )
    }

    return

});


export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}