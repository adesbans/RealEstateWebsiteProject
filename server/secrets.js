/*
 * Keeps the app's secret tokens.
 *
 * @author Alex Desbans
 */

// Note, these objects can hold whatever you need to access your API (e.g., username/password, etc.)
exports.FLICKR_API = {
    URL: 'https://www.flickr.com/services/rest/',
    TOKEN: '0677de6a559772c8cb27dd22219dfa0c',
};
exports.OPENWEATHER_API = {
    URL: 'https://api.openweathermap.org/data/2.5/',
    TOKEN: '45713cc0d54c4bfa1c7efbbdbd1c6c2b',
};
exports.REALTOR_API = {
    URL: 'https://realtor.p.rapidapi.com/properties/v2/list-for-sale',
    TOKEN: '3329742409mshc5b792d091a044ap150791jsnabacb6533055',
};
exports.REALTORCOM_API = {
    URL: 'https://realtor-com-real-estate.p.rapidapi.com/for-sale',
    TOKEN: '3329742409mshc5b792d091a044ap150791jsnabacb6533055',
};

exports.REALTYMOLE_API = {
    URL: 'https://realty-mole-property-api.p.rapidapi.com/properties',
    TOKEN: '3329742409mshc5b792d091a044ap150791jsnabacb6533055',
};

exports.ZILLOW_API = {
    URL: 'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch',
    TOKEN: '3329742409mshc5b792d091a044ap150791jsnabacb6533055',
};

exports.ZILLOWIMAGES_API = {
    URL: 'https://zillow-com1.p.rapidapi.com/images',
    TOKEN: '3329742409mshc5b792d091a044ap150791jsnabacb6533055',
};

exports.ZILLOWDETAILS_API = {
    URL: 'https://zillow-com1.p.rapidapi.com/property',
    TOKEN: '3329742409mshc5b792d091a044ap150791jsnabacb6533055',
};
//https://realtor.p.rapidapi.com/properties/v2/list-for-sale?city=Durham&limit=400&offset=0&state_code=NC&sort=relevance

//https://realtor-com-real-estate.p.rapidapi.com/for-sale?city=Durham&state_code=NC&offset=0&limit=200
//https://realtor-com-real-estate.p.rapidapi.com/for-sale?city=Durham&state_code=NC&offset=0&limit=400

//https://realty-mole-property-api.p.rapidapi.com/properties?limit=200&city=Durham
//https://realty-mole-property-api.p.rapidapi.com/properties?limit=200&city=Durham
//0697362eddmshbdbfaf21c881514p16690bjsnaa2595a611b5
//^temp key

//3329742409mshc5b792d091a044ap150791jsnabacb6533055
//^key with pro plan

// These should represent the final URLs for your front- and backend projects
exports.DEPLOYED_URLS = {
    // TODO: change to Heroku and GitLab URLs, with a trailing slash
    SERVER: 'https://banana-crisp-29603.herokuapp.com/',
    VIEW: 'https://compsci290_2021spring.dukecs.io/portfolio_ard56/FinalProject/ui/dist/'
}

// WARNING: really lousy encryption key!
exports.COOKIE_ENCRYPTION_KEY = 'SECRET';

// This needs to be downloaded from Google Cloud Service Credentials Console to configure access
//   https://console.cloud.google.com/apis/credentials
exports.OAUTH = {
    "web": {
        "client_id":"473092363064-au0ujoaomfgua79ouhlfssl7j2vu89et.apps.googleusercontent.com",
        "project_id":"mystic-centaur-310614",
        "auth_uri":"https://accounts.google.com/o/oauth2/auth",
        "token_uri":"https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
        "client_secret":"C7uwzNBHMFTaaA6MSVrUAiY7",
        "redirect_uris":["http://localhost:8080/api/auth/google/redirect",
        "https://banana-crisp-29603.herokuapp.com"]
    }
};

exports.FIREBASE_CONFIG = {
        "type": "service_account",
        "project_id": "final-project-581eb",
        "private_key_id": "f0c9cc2e4b8cab3663e8ecfde0faac2b837d3826",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDdue+o7heFTJen\nfiZMaayPaaqMb4CUzm+eY68YOFnfqSwQPsqxfCgpwuiMBVl0YoUIXu/aEFIYtQ1Z\nBHLPYQ5Z/V8ByKA1/j98I1EuUSZA0YYFx3mDVT80yawqKp3qQo3ynZeiaC0/SPHq\nw2Dfrn/ZhutSTpw8huAQ121xk+U297JFc8pA3xsigXw2/+i+8Je81HPLD7c59SXG\nTMW1AwvH009ZO+TsjhzBXAewEC7zmKmQ9lnLtxygHCx+9AvLJfr+bt1FruvymZlJ\n9xHyTNgrioPwuvxxwyi+xN9Nh3xngB0Rh6uk0TB9Xjp5w3LCvlBaBRIeXEZ7gy8T\nS8wnOSKxAgMBAAECggEAImgSxE5UCIua4fMdqtBgJm4BeOLpm03QfM3fsxy1d5NX\nIts3lWScj+RutSG0YK7UEXk384kCUFKyFEzwKvWW5kh+yHZTRCWkwNTzKUKO8tKA\nn191n/dnxD+CT5XG5P34bHxfdiR/1vjxD1rLqtI3hTAeTqqjrHHKjdp8IXqPgGCT\n+KwKVdfrzfIqq4Bwv89YIgm8fn1CGWftbGSeFQbK6n05UmhDwaDJzWBX/wn9RgJe\nVsWa68NaX8B+L1l+GBgIaCO+CEX2ui0nou5t7+RSabsq+OWiVdt3kg2Dls3xoKyR\n+NVEESqcFg+9JpCL+puP08OF2yUPu2HdPT4LxVkDJQKBgQD6hMnIeMzi5aHOyCy7\nFNwuQyhshEDXhsjmrTBn7vs2zIVi6uornWCvUjcV7xoEv6uSjmwcKQ3RtnY4pjRp\n9MHwkTwz/rctSNMRl2/4cjOYILuKM9Ux+SjDb0YiCXeK3MmzySN7bghkyIm5OCYd\n4MB9uOdwCa3/NDm8rZGe5/+QfQKBgQDik+ASSP/O9NLssaY7hZ1fLSNAdPzC7GIm\n3H5yL1s2L2olm37pOM91ph4oP9HaByC0Oo6UBNC44hzE7CVc3LMbrzQHYO742kYP\nRN+yvmAqo0cIFa3VG1ZC6VrQdvEW/VM7xEXVJBH/c2khuX6bcbn/IGFM9IF/0vSG\nEs0c0XPFRQKBgQCuh7h0nARRxx11jGvtYlkLOep9v53VCagJXXstzYbi5JXBFlxS\nSnBDdInAFDYSPN5xWhvjeo6QHgg66z/02XoL+YLxznEbcXLq/JAbjKR5RcSiQf4z\ntJw7m9hGekX4Tl2PjX/UzBG49SVODtovUpeIfztuCLBZ7a6TznB3PrYDmQKBgHgA\nRc6pZwKfXA8MT7R6oczExUTgMPaz55AZe8bSGgbquddNMbwn4Ii5AIPkuSo2WDXc\nRaNToZAqAX6ya19xbFMfSfkWd7rJMA3qNmgeuCQc8gPwJ28U2Wz61qROOoYoiSrA\nWxP11Kps36OC8PE3HIFpDt+JKAUhH2zbDFNVA3HZAoGBANIQWeraBEPvm6yP9SSv\nDH3Xk6dmi/ONyq3geUp1P05Ufdmx0bl1joLKjhnMqi8EjH/FJkdzgc1dJeN+QwYr\n7ZVc6iBb+Ga5lo9dznWnFzxvgS7gmzqivBAbsGBJsJLPKyCsoRUgWlLwhBw+kXi/\n1oEsY3j9GvU5hU8BIOlS8OmR\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-j0yih@final-project-581eb.iam.gserviceaccount.com",
        "client_id": "112831116098926367010",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-j0yih%40final-project-581eb.iam.gserviceaccount.com"
};