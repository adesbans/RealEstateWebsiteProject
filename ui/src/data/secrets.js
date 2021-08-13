/*
 * Keeps the app's secrets (anything that can be stolen and used inappropriately).
 *
 * Note, if we were using public GIT repository, this file would NOT be committed and pushed!
 * Note, these are throw-away tokens, but please do not abuse so everyone in the class can
 * experiment with this example.
 *
 * @author Robert C. Duvall
 */

// different possible URLs to represent server (trailing / is important)
// NOTE, commented out unused variables to appease ESLint
const REMOTE_URL = 'https://banana-crisp-29603.herokuapp.com/api/';
//const LOCAL_URL = 'http://localhost:3000/api/';
//const PROXY_URL = 'api/';


// Note, these objects can hold whatever you need to access your API (e.g., username/password, etc.)
exports.DATA_API = {
    URL: REMOTE_URL
};
