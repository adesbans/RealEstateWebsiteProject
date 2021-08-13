/*
 * This is the code for a server that gives JSON data.
 *
 * @author Alex Desbans
 */

// set up dependencies: these modules export functions that can then be called below
// package for responding to requests for a specific URL
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
// make a generic server and start listening for requests
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
const auth = require('./authentication.js');

// package for logging attempts to access the server (for easier debugging)
const morgan = require('morgan');
const morganBody = require('morgan-body');
app.use(morgan('\n\n:method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
morganBody(app, {
    logRequestBody: true,
    logAllReqHeader: true,
    logResponseBody: true,
    logAllResHeader: true,
});

// package that replicates fetch functionality built into the browser
const fetch = require('node-fetch');
// package that bundles up query parameters given as an Object into URL syntax
const querystring = require('querystring');
// package that allows certain URLs to access the server


const dataStore = require('./dataStore.js.js');

const allFavs = [];

const adminEmailAddresses = ['dennisquan@gmail.com', 'fake_alice@cs.duke.edu', 'aldesbans01@gmail.com', 'rcd@cs.duke.edu', 'dquan@cs.duke.edu'];
const tenantEmailAddresses = ['compsci290project@gmail.com'];

function extractUserId(req) {
    return req.user?.id || '<none>';
}

function validateUserData (parts, property) {
    return (req, res, next) => {
        parts.forEach(p => {
            // error, break typical middleware "chain" and allow error handler to be next handler 
            if (req[property][p] === undefined) {
                res.status(400);
                return next(new Error(`Usage: please provide value for expected parameter ${p}`));
            }
        });
        // everything OK, continue to the next request handler
        next();
    }
}

function returnAllData () {
    return async (req, res, next) => {
        // NOTE, not ideal to return ALL the data but makes it easier to debug and use by frontend
        const allFavs = await dataStore.getData();
        res.status(200);
        res.json(allFavs);
    }
}

// set up server specific configuration values
const { FLICKR_API, OPENWEATHER_API, REALTORCOM_API, REALTYMOLE_API, ZILLOW_API, ZILLOWDETAILS_API, ZILLOWIMAGES_API } = require('./secrets');
// allow code to be run locally or when deployed on a remote host



//---------------------------------------------------------------------
// set up middleware apps that manage "all" URL requests
// log all requests made to the server
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// setup CORS options for maximum security
const whitelist = ['https://compsci290_2021spring.dukecs.io', 'http://localhost:8080/'];
const corsOptions = {
    origin: (origin, callback) => {
        // only allow sites listed above or dev-server proxies to access server data
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            const err = new Error('CORS Error: This site is not authorized to access this resource.');
            err.status = 401;
            callback(err);
        }
    },
};

const cors = require('cors');
app.use(cors());
auth.setupAuthentication(app);
//---------------------------------------------------------------------
// utility functions
// simple function to factor out common code from the API methods
// NOTE, queryParameters contains values meant to be passed along with the URL (i.e., after the ?)
// NOTE, protocolOptions contains values meant to be passed along with the request (i.e., GET/POST, headers, etc.)
async function getJSON(url, apiAction, queryParameters, protocolOptions) {
    const parameters = queryParameters ? `?${querystring.stringify(queryParameters)}` : '';
    const urlWithParameters = `${url}${apiAction}${parameters}`;
    console.log(urlWithParameters);
    const response = await fetch(urlWithParameters, protocolOptions);
    if (response.ok) {
        return response.json();
    }
    else {
        throw new Error(`API Access Error ${response.status} for URL: ${urlWithParameters}`);
    }
}

// access Realtor API to get useful data
async function fetchProperties() {
    // set up query parameters needed to get interesting data
    const parameters = {
        location: 'Durham, NC'
    };
    // fetch data from the API using the set parameters
    const jsonData = await getJSON(ZILLOW_API.URL, '', parameters, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": ZILLOW_API.TOKEN,
            "x-rapidapi-host": "zillow-com1.p.rapidapi.com"
        }
    });
    console.log(jsonData);
    console.log(jsonData.status);
    // pick random image from those returned
    if (jsonData) {
        console.log(jsonData);
        return jsonData;
    }
    

    
    throw new Error(`Realtor API Error: ${jsonData.message}`);
}

async function fetchImages(id) {
    // set up query parameters needed to get interesting data
    
    const parameters = {
        zpid: id
    };

    const jsonData = await getJSON(ZILLOWIMAGES_API.URL, '', parameters, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": ZILLOWIMAGES_API.TOKEN,
            "x-rapidapi-host": "zillow-com1.p.rapidapi.com"
        }
    });
    
        
    ;
    // fetch data from the API using the set parameters
    console.log(jsonData);
    console.log(jsonData.status);
    // pick random image from those returned
    if (jsonData) {
        console.log(jsonData);
        return jsonData;
    }

    
    throw new Error(`Realtor API Error: ${jsonData.message}`);
}

async function fetchDetailData(id) {
    // set up query parameters needed to get interesting data
    
    const parameters = {
        zpid: id
    };

    const jsonData = await getJSON(ZILLOWDETAILS_API.URL, '', parameters, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": ZILLOWDETAILS_API.TOKEN,
            "x-rapidapi-host": "zillow-com1.p.rapidapi.com"
        }
    });
    
        
    ;
    // fetch data from the API using the set parameters
    console.log(jsonData);
    console.log(jsonData.status);
    // pick random image from those returned
    if (jsonData) {
        console.log(jsonData);
        return jsonData;
    }

    
    throw new Error(`Realtor API Error: ${jsonData.message}`);
}

function returnAllData () {
    return async (req, res, next) => {
        // NOTE, not ideal to return ALL the data but makes it easier to debug and use by frontend
        const allLinks = await dataStore.getData();
        res.status(200);
        res.json(allLinks);
    }
}

//---------------------------------------------------------------------
// set up URL responses:
// provide some response to visiting the server directly (i.e., its homepage)
app.get(
    '/',
    (req, res) => {
        res.status(200);
        res.send('<a href="api/get_data?lat=36&lon=-79">Get the Data!</a>');
    },
);

// return the JSON data resulting from remote API requests
// NOTE, lat/lon parameters are provided in the URL as request's query parameters
app.get(
    '/api/get_data',
    async (req, res, next) => {
        try {
            // use named query parameters to pass to our functions
            const propertiesData = await fetchProperties();
            
            
            
            // everything is OK, so report back to browser
            res.status(200);
            // construct JSON object to return, must match what frontend is expecting
            res.json({
                propertiesData,
                //imageData
            });
        }
        catch (error) {
            console.log(error);
            // create error object with useful message
            const err = new Error('Error: Check server --- one or more APIs are currently unavailable.');
            // set status code to return with response
            err.status = 503;
            // forward error on to next middleware handler (the error handler defined below)
            next(err);
        }
    },
);

app.get(
    '/api/get_detail',
    async (req, res, next) => {
        //req.query.zpid
        try {
            // use named query parameters to pass to our functions
            //const finalData = [];
            //const imageData = await fetchImageData(req.query.zpid);
            //finalData.push(imageData);
            const detailData = await fetchDetailData(req.query.zpid);
            //finalData.push(detailData);
            //const imageData = await fetchImages(propertiesData);
            //const imageData = await fetchImages(req.query.zpid);
            
            // everything is OK, so report back to browser
            res.status(200);
            // construct JSON object to return, must match what frontend is expecting
            res.json({
                detailData
            });
        }
        catch (error) {
            console.log(error);
            // create error object with useful message
            const err = new Error('Error: Check server --- one or more APIs are currently unavailable.');
            // set status code to return with response
            err.status = 503;
            // forward error on to next middleware handler (the error handler defined below)
            next(err);
        }
    },
);

app.get(
    '/api/get_images',
    async (req, res, next) => {
        //req.query.zpid
        try {
            // use named query parameters to pass to our functions
            //const finalData = [];
            //const imageData = await fetchImageData(req.query.zpid);
            //finalData.push(imageData);
            const imageData = await fetchImages(req.query.zpid);
            //finalData.push(detailData);
            //const imageData = await fetchImages(propertiesData);
            //const imageData = await fetchImages(req.query.zpid);
            
            // everything is OK, so report back to browser
            res.status(200);
            // construct JSON object to return, must match what frontend is expecting
            res.json({
                imageData
            });
        }
        catch (error) {
            console.log(error);
            // create error object with useful message
            const err = new Error('Error: Check server --- one or more APIs are currently unavailable.');
            // set status code to return with response
            err.status = 503;
            // forward error on to next middleware handler (the error handler defined below)
            next(err);
        }
    },
);

app.get(
    '/api/user',
    (req, res) => {
        // extract out the useful parts of the req.user object
        const id = extractUserId(req);
        const email = req.user?.emails ? req.user.emails[0].value : null;
        res.json({
            id,
            displayName: req.user?.displayName,
            email,
            isAdmin: adminEmailAddresses.includes(email),
            isTenant: tenantEmailAddresses.includes(email),
            photo: req.user?.photos?.length >= 1 ? req.user.photos[0].value : null,
        });
    },
);

app.get(
    '/api/getFavs',
    returnAllData()
);

app.post(
    '/api/addFav',
    // check parameters from the user to make sure they are all included
    // can now assume complete user data, so do the work to change data structure
    async (req, res, next) => {
        await dataStore.addFav(req.body.id, req.body.prop);
        next();
    },
    // NOTE, not ideal to return ALL the data but makes it easier to debug and use by frontend
    returnAllData()
);

app.post(
    '/api/removeFav',
    // check parameters from the user to make sure they are all included
    // can now assume complete user data, so do the work to change data structure
    async (req, res, next) => {
        await dataStore.removeFav(req.body.id, req.body.i);
        next();
    },
    // NOTE, not ideal to return ALL the data but makes it easier to debug and use by frontend
    returnAllData()
);


// handle errors thrown by the application code
// NOTE, this actually must be defined LAST in order to catch any errors from others
app.use((err, req, res, next) => {
    console.log(err);
    // delegate to default Express error handler if HTTP header info has already been sent back
    if (res.headersSent) {
        next(err);
        return;
    }
    // set error status and return error message as JSON
    // since that is what the frontend is expecting
    res.status(err.status || 500).json({ message: err.message });
});