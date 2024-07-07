/**
 * An Array of routes that are accessible to the public
 * These Routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/"
];

/**
 * An Array of routes that are accessible to the public
 * These Routes will redirect looged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
];

/**
 * The prefix for API authentication routes 
 * Routes that start with this prefix are used for API authentication pupose
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";


/**
 * The default route after user in logged in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";