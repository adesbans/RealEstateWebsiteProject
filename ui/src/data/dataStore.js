/*
 * This represents the reactive data to be edited.
 *
 * It represents the only interaction with the server to ease burden on the rest of the code.
 *
 * @author Robert C. Duvall
 * @author Dennis Quan
 */

// package that bundles up query parameters given as an Object into URL syntax
import querystring from 'querystring';
// not really a "secret", but provides "security through obscurity"
import { DATA_API } from './secrets.js';


// simple utility function to encode the given object as query parameters and return the resulting JSON
// NOTE, queryParameters contains values meant to be passed along with the URL (i.e., after the ?)
// NOTE, protocolOptions contains values meant to be passed along with the request (i.e., GET/POST, headers, etc.)
async function getJSON(url, apiAction, queryParameters, protocolOptions) {
    const parameters = queryParameters ? `?${querystring.stringify(queryParameters)}` : '';
    const urlWithParameters = `${url}${apiAction}${parameters}`;
    console.log(urlWithParameters);
    const response = await fetch(urlWithParameters, protocolOptions);
    // only convert response if request suceeded
    if (response.ok) {
        return await response.json();
    }
    else {
        // FIXME: probably a better way to handle this - return an empty data object
        console.error(response);
        return {};
    }
}


export const dataStore = {
    data: () => [],

    // retrieve complete set of data from API
    async getData () {
        console.log(`Getting complete data set`);
        this.data = await getJSON(DATA_API.URL, 'getFavs', null, {
            // these are typically set by default, just here to show a possibility
            method: 'GET',
            headers: { 'Accept': 'application/json', 'Accept-charset': 'UTF-8' }
        });
        console.log('before');
        console.log(this.data);
    },
    // change title of group at the given ID
    async setTitle (groupId, newTitle) {
        console.log(`Setting title from ${this.data[groupId].title} to ${newTitle}`);
        this.data = await getJSON(DATA_API.URL, 'setTitle',
            // could also send URL query parameters, but none needed for this example
            null, {
                // change existing data in the server with value sent in body field
                method: 'PUT',
                // create JSON string by hand
                body: `{ "id": "${groupId}", "title": "${newTitle}" }`,
                headers: { 'Content-type': 'application/json;charset=UTF-8' }
            }
        );
    },
    // add new link to group at the given ID
    async addFav (groupId, newProp) {
        this.data = await getJSON(DATA_API.URL, 'addFav',
            // could also send URL query parameters, but none needed for this example
            null, {
                // add new data to be saved with values sent in body field
                method: 'POST',
                // create JSON string automatically
                body: JSON.stringify({ id: groupId, prop: newProp }),
                headers: { 'Content-type': 'application/json;charset=UTF-8' }
            }
        );
    },
    async removeFav (groupId, index) {
        this.data = await getJSON(DATA_API.URL, 'removeFav',
            // could also send URL query parameters, but none needed for this example
            null, {
                // add new data to be saved with values sent in body field
                method: 'POST',
                // create JSON string automatically
                body: JSON.stringify({ id: groupId, i: index }),
                headers: { 'Content-type': 'application/json;charset=UTF-8' }
            }
        );
    }
};
