/*
 * This represents "database" to be edited.
 * 
 * Note, this is NOT a good solution for handling shared data (the default for a web app)
 *
 * @author Robert C. Duvall
 * @author Dennis Quan
 */

const admin = require('firebase-admin');

// provide global access to initialized app database
const { FIREBASE_CONFIG } = require('./secrets');
admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_CONFIG),
    databaseURL: `https://${FIREBASE_CONFIG.project_id}-default-rtdb.firebaseio.com`,
});
const DB = admin.database();


// actual data structure that the rest of the program will interact with
module.exports = {
    // could store a local copy of the database data to reduce time querying,
    // but note that any "extra" data only here in server will be wiped out 
    // periodically when Heroku restarts server
    dataRef: DB.ref('data'),

    // return all the data
    async getData () {
        console.log(`Getting data at ${this.getTimeStamp()}`);
        // NOT the data directly, get current snapshot of all data to process locally
        const snapshot = await this.dataRef.once('value');
        console.log(snapshot);
        // return actual data held within snapshot (also has convenience functions like forEach to process the data)
        return snapshot.val();
        // note could catch possible errors here, but should be caught be "general" error middleware
    },
    // change title of group at the given id
    async setTitle (id, newTitle) {
        console.log(`Setting title for group ${id} to ${newTitle}`);
        // get pointer to where the data is and then change it to the given value
        await this.dataRef.child(`${id}/title`).set(newTitle);
        // note could catch possible errors here, but should be caught be "general" error middleware
    },
    // add new link to group at the given id
    async addFav (id, prop) {
        // get pointer to data collection and add to it like a JavaScript array
        // (but it is really an object with Firebase generated index keys)
        await this.dataRef.child(`${id}`).push(prop);
        // note could catch possible errors here, but should be caught be "general" error middleware
    },
    async removeFav (id, index) {
        // get pointer to data collection and add to it like a JavaScript array
        // (but it is really an object with Firebase generated index keys)
        const data = await this.getData();
        const key = Object.keys(data[id])[index];
        await this.dataRef.child(`${id}/${key}`).remove();
        // note could catch possible errors here, but should be caught be "general" error middleware
    },
    // basic utility to display the time in a readable format
    getTimeStamp () {
        return new Date().toISOString().slice(0, 19).replace('T',' ');
    }
};
