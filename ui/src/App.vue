<!-- Vue files are divided into three parts: HTML template, JavaScript Object, and CSS styling -->
<template>
  <div id="app">

    <body>
      <!-- div for main page -->
      <div v-if="onMainPage">
        <div id="buttons">
          <img alt="logo" id="logo" src="./assets/logo.png">
          <ul>
            <li v-if="user.email == null" class="button"><h4><a :href="'https://banana-crisp-29603.herokuapp.com/api/auth/login'" title="Log In Page">Log In</a></h4></li>
            <li  v-else class="button"><h4><a :href="'https://banana-crisp-29603.herokuapp.com/api/auth/logout'" title="Log Out Page">Log Out</a></h4></li>
            <li class="button"><div @click="toAboutPage"><h4>About Us</h4></div></li>
            <li id="title"><h1 :aria-label="`header set`">Desbans Realty Group</h1></li>

          </ul>
        </div>

        <section>
          <h2 v-if="user.isAdmin" id="adminmessage">In Admin Mode</h2>
          <img alt="mainimage" id="mainimage" src="./assets/apt1.jpeg">
        </section>

        <div id="pages">
          <ul v-if="user.isTenant">
            <li class="page"><div @click="toMaintenancePage"><h4>Request Maintenance</h4></div></li>
            <li class="page"><div @click="toRentPage"><h4>Pay Monthly Rent</h4></div></li>
            <li class="page"><div @click="toRentalPage"><h4>Rental Application</h4></div></li>
            <li class="page"><div @click="toHousingPage"><h4>Available Housing</h4></div></li>
          </ul>
          <ul v-else id="centermore">
            <li class="lesspages"><div @click="toRentalPage"><h4>Rental Application</h4></div></li>
            <li class="lesspages"><div @click="toHousingPage"><h4>Available Housing</h4></div></li>
          </ul>
        </div>
        
        <div id="bottom">
          <h4>Email any questions or concerns to: <strong>alex.desbans@duke.edu</strong></h4>
          <br>
          <br>
          The logo image is from <a href="https://www.graphicsprings.com/logographics/simple-house-real-estate">graphicsprings.com</a> 
          and the main image is from <a href="https://www.zillow.com/jamaica-plain-boston-ma/furnished-apartments/">Zillow.com</a>.
        </div>
      </div>

      <!-- div for maintenance page -->
      <div v-if="onMaintenancePage" class="Maintenancepage">
        <div class="homebutton" @click="toHomePage">
            <h4 >Return Home</h4>
        </div>
          <br>
          <br>
          <br>
          <br>
        <maintenance-page></maintenance-page>
      </div>

      <!-- div for rental application page -->
      <div v-if="onRentalPage">
        <div class="homebutton" @click="toHomePage">
            <h4>Return Home</h4>
        </div>
          <br>
          <br>
          <br>
          <br>
          <h2 id="maintenaceheader">Start a Rental Application</h2>
        <div class="container">
            <form @submit.prevent="sendEmailTwo" enctype="multipart/form-data" method="post">
              <label>Name</label>
              <input 
                type="text" 
                v-model="rentalname"
                name="Name"
                placeholder="Your Name"
              >
              <label>Email</label>
              <input 
                type="email" 
                v-model="rentalemail"
                name="Email"
                placeholder="Your Email"
                >
              <label>Phone Number</label>
              <br>
              <br>
              <br>
              <input 
              type="tel" 
              v-model="rentalphonenumber"
              name="Phone Number"
              placeholder="Your Phone Number"
              >
              <br>
              <br>
              <label>In which property are you interested?</label>
              <select name="Rental Property" v-model="rentalproperty">
              <option v-for="(property, i) in propertiesData.props" :key="i">{{property.address}}</option>
              </select>

              
              <br>
              <br>
              <label>What is your move in date?</label>
              <br>
              <br>
              <input 
                type="date" 
                v-model="rentalmoveindate"
                name="Move In Date"
              >
              <br>
              <br>
              <label>How many adults plan to move in?</label>
              <br>
              <br>
              <select name="Adults" v-model="rentaladultsnum">
                <option value="One">One</option>
                <option value="Two">Two</option>
                <option value="Three">Three</option>
              </select>
              <br>
              <br>
              <label>How many children plan to move in?</label>
              <br>
              <br>
              <select name="Adults" v-model="rentalchildrennum">
                <option value="None">None</option>
                <option value="One">One</option>
                <option value="Two">Two</option>
              </select>
              <br>
              <br>
              <label>Do you have any pets?</label>
              <br>
              <br>
              <select name="Pets" v-model="rentalpets">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <br>
              <br>
              <label>What is the approximate combined level of gross income of all tenants?</label>
              <input 
                type="text" 
                v-model="rentalincome"
                name="Income"
                placeholder="Type answer here..."
              >
              <br>
              <br>
              <label>Is anyone a smoker?</label>
              <br>
              <br>
              <select name="Smoker" v-model="rentalsmoker">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <br>
              <br>
              <label>Do you have any significant debts or payment amounts to make in addition to the rent?</label>
              <br>
              <br>
              <select name="Debts" v-model="rentaldebts">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <br>
              <br>
              <label>Please describe the main payments you have to make:</label>
              <textarea 
                name="Payments"
                v-model="rentalpayments"
                cols="30" rows="5"
                placeholder="Type answer here...">
              </textarea>
              <br>
              <br>
              <label>How would you rate your credit?</label>
              <br>
              <br>
              <select name="Credit" v-model="rentalcredit">
                <option value="Poor">Poor</option>
                <option value="Fair">Fair</option>
                <option value="Good">Good</option>
              </select>
              <br>
              <br>
              <label>For how long have you been working in the same field?</label>
              <input 
                type="text" 
                v-model="rentaltimeworking"
                name="Time Working"
                placeholder="Type answer here..."
              >
              <br>
              <br>
              <label>In which industry, position and location do you work?</label>
              <input 
                type="text" 
                v-model="rentalindustry"
                name="Industry"
                placeholder="Type answer here..."
              >
              <br>
              <br>
              <label>What is your employment status?</label>
              <br>
              <br>
              <select name="Employment" v-model="rentalemployment">
                <option value="Hourly">Hourly</option>
                <option value="Salaried">Salaried</option>
                <option value="Self-employed">Self-employed</option>
              </select>
              <br>
              <br>
              <label>What is the reason of your move?</label>
              <input 
                type="text" 
                v-model="rentalreason"
                name="Reason"
                placeholder="Type answer here..."
              >
              <br>
              <br>
              <label>Are you OK with a 12-month lease?</label>
              <br>
              <br>
              <select name="Lease" v-model="rentallease">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <br>
              <br>
              <label>Are you OK with a one-month rent equivalent security deposit?</label>
              <br>
              <br>
              <select name="Deposit" v-model="rentaldeposit">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <br>
              <br>
              <label>Please provide any extra information or any questions you may have here:</label>
              <textarea 
                name="Extra Info"
                v-model="rentalextrainfo"
                cols="30" rows="5"
                placeholder="Type answer here...">
              </textarea>
              <br>
              <br>
              <input type="submit" value="Send">
            </form>
        </div>
      </div>


      <!-- div for About Us page -->
      <div v-if="onAboutPage">
        <div class="homebutton" @click="toHomePage">
            <h4>Return Home</h4>
        </div>
          <br>
          <br>
          <br>
          <br>
          <about-page></about-page>
      </div>

      <!-- div for pay rent page -->
      <div v-if="onRentPage">
        <div>
          <div class="homebutton" @click="toHomePage">
            <h4>Return Home</h4>
          </div>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <h3 id="rentmessage">
            This page will take a tenant directly to another service to handle paying rent. I should not be
            managing other people's hard earned money!
          </h3>
        </div>
      </div>
        <!-- div for Available Housing page -->
        <div v-if="onHousingPage" id="HousingPage">
          <div class="homebutton"  @click="toHomePage">
            <h4>Return Home</h4>
          </div>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <div>
          <h1>Available Housing</h1>
          <br>
          <p id="welcome">
            This page allows you to search through available housing. Each
            property is displayed in its own box and displays the property's address, price, and
            square footage. You can sort the properties based on their price, square footage, or both.

            This page is powered by the 
            <strong><a href="https://rapidapi.com/apimaker/api/zillow-com1?endpoint=apiendpoint_93602987-7c54-426d-94f3-1fce926b3ebb">Zillow API</a></strong> from 
            <strong><a href="https://rapidapi.com/marketplace">RapidAPI.com</a></strong>.
          </p>
          <br>
          <br>
          <h5>Number of properties displayed: {{ filteredProperties.length }} </h5>
          <!-- section for filter options -->
          <section>
            <form>
              <input type="checkbox" id="Price under $300,000"
              name="price" value="Filter by Price"
              @click="priceClicked">
              <label for="price" id="pricelabel">Filter by Price</label><br>
              <br>
              <input
              type="checkbox"
              v-model="bedIsChecked" @click="bedClicked" 
              >
              <label for="price" id="bedlabel">Filter by Number of Bedrooms</label><br>
              <br>
              <input
              type="checkbox" 
              v-model="bathIsChecked" @click="bathClicked" 
              >
              <label for="price" id="bathlabel">Filter by Number of Bathrooms</label><br>
              <br>
              <input
              type="checkbox" 
              v-model="homeIsChecked" @click="homeClicked" 
              >
              <label  id="homelabel">Filter by Type of Home</label><br>
              <br v-if="user.email != null && allFavs.data[user.id] != undefined">
              <input
              v-if="user.email != null && allFavs.data[user.id] != undefined"
              type="checkbox" 
              v-model="favIsChecked" @click="favsClicked" 
              >
              <label v-if="user.email != null && allFavs.data[user.id] != undefined" id="favslabel">Display Favorite Properties</label><br>
            </form>
            <!-- div for input for filters -->
          <div v-if="someoneChecked" id="entrybox">
            <ul>
              <li v-if="priceIsChecked">
                <div class="filters" id="filtersforprice">
                  <label id="priceinputlabel">Max. Price: ${{ maxprice }}</label>
                  <input id="priceinput" type="range" min="0" max= "1000000" value="500000" v-model="maxprice">
                </div>
              </li>

              <li v-if="bedIsChecked">
                <div class="filters">
                  <label class="bedbathfilterlabel">Bedrooms: </label>
                  <select v-model="numbeds">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                  </select>
                  
                </div>
              </li>

              <li v-if="bathIsChecked">
                <div class="filters">
                  <label class="bedbathfilterlabel">Bathrooms: </label>
                  <select v-model="numbaths">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                  </select>
                  
                </div>
              </li>

              <li v-if="homeIsChecked">
                <div class="filters">
                  <label class="bedbathfilterlabel">Type of Home: </label>
                  <select v-model="hometype">
                    <option value="SINGLE_FAMILY">Single Family</option>
                    <option value="TOWNHOUSE">Townhouse</option>
                  </select>
                  
                </div>
              </li>
            </ul>
            <button id="filterbutton" @click="applyFilters">Apply Filters</button>
            <button id="resetbutton" @click="resetFilters">Reset Filters</button>
          </div>
          </section>
          <br>
          <!-- div holds map and property content -->
          <div id="content">
            <div id="map">
              <div style="height: 80vh">
                <LMap :zoom="zoom" :center="center">
                  <LTileLayer :url="url"></LTileLayer>
                  <div v-for="(prop, z) in filteredProperties" :key="z">
                    <LMarker :lat-lng="[prop.latitude, prop.longitude]" @click="loadData(prop)"></LMarker>
                  </div>
                </LMap>
              </div>
            </div>
            <div id="propertieslist">
              <section class="box">
                  <br>
                  <div v-for="(prop, i) in filteredProperties" :key="i"  class="property" @click="loadData(prop)">
                      <h4>{{prop.address}}</h4>
                      <div class="indent">
                        <p>{{prop.bedrooms}} bed, {{prop.bathrooms}} bath</p>
                        <p class="info">Price: ${{prop.price}}</p>
                      </div>
                  </div>
                  <b-modal cancel-disabled v-model="modalVisible" v-if="modalVisible">
                    <h4>{{serverData.detailData.streetAddress}}</h4>
                    <p>{{serverData.detailData.description}}</p>
                    <br>
                    <h5>Property Info</h5>
                    <p>Price: ${{serverData.detailData.price}}</p>
                    <p>Square Footage: {{serverData.detailData.livingArea}} sqft</p>
                    <p>Year Built: {{serverData.detailData.yearBuilt}}</p>
                    <p>Property Type: {{serverData.detailData.propertyTypeDimension}}</p>
                    <p>Brokerage Name: {{serverData.detailData.brokerageName}}</p>
                    <p v-if="serverData.detailData.resoFacts.hasAttachedProperty">Has Attached Property: Yes</p>
                    <p v-else-if="!serverData.detailData.resoFacts.hasAttachedProperty">Has Attached Property: No</p>
                    <p v-if="serverData.detailData.resoFacts.hasOpenParking">Has Open Parking: Yes</p>
                    <p v-else-if="!serverData.detailData.resoFacts.hasOpenParking">Has Open Parking: No</p>
                    <p>Lot Size: {{serverData.detailData.resoFacts.lotSize}}</p>
                    <br>

                    <h5>Property Features</h5>
                    <p v-if="serverData.detailData.resoFacts.hasGarage">Garage: Yes</p>
                    <p v-else-if="!serverData.detailData.resoFacts.hasGarage">Garage: No</p>
                    <p v-if="serverData.detailData.resoFacts.hasPetsAllowed">Pets Allowed: Yes</p>
                    <p v-else-if="!serverData.detailData.resoFacts.hasPetsAllowed">Pets Allowed: No</p>
                    <p v-if="serverData.detailData.resoFacts.hasPrivatePool">Pool: Yes</p>
                    <p v-else-if="!serverData.detailData.resoFacts.hasPrivatePool">Pool: No</p>
                    <p v-if="serverData.detailData.resoFacts.hasCooling">Has Cooling: Yes</p>
                    <p v-else-if="!serverData.detailData.resoFacts.hasCooling">Has Cooling: No</p>
                    <p>Appliances:</p>
                    <ul v-for="(appliance, i) in serverData.detailData.resoFacts.appliances" :key="i">
                      <li>{{appliance}}</li>
                      <br>
                    </ul>
                    <br>

                    <h5>Neighborhood Info</h5>
                    <p v-if="serverData.detailData.resoFacts.hasAssociation">Has Association: Yes</p>
                    <p v-else-if="!serverData.detailData.resoFacts.hasAssociation">Has Association: No</p>
                    <p v-if="serverData.detailData.resoFacts.associationFee">Association Fee: {{serverData.detailData.resoFacts.associationFee}}</p>
                    <p v-if="serverData.detailData.resoFacts.communityFeatures">Community Features:</p>
                    <ul v-for="(feature, k) in serverData.detailData.resoFacts.communityFeatures" :key="k">
                      <li>{{feature}}</li>
                      <br>
                    </ul>
                    <p>Elementary School: {{serverData.detailData.resoFacts.elementarySchool}}</p>
                    <p>Middle School: {{serverData.detailData.resoFacts.middleOrJuniorSchool}}</p>
                    <p>High School: {{serverData.detailData.resoFacts.highSchool}}</p>
                    <div v-if="user.email != null && allFavs.data[user.id] != undefined  && Object.values(allFavs.data[user.id]).filter(p => p.address === currentProp.address).length > 0">
                      <br>
                      <br>
                      <b-button @click="removeFav(user.id, currentProp)">Remove from Favorites List</b-button>
                    </div>
                    <div v-else-if="user.email != null">
                      <br>
                      <br>
                      <b-button @click="addFav(user.id, currentProp)">Add to Favorites List</b-button>
                    </div>
                    
                    <br>
                    <br>
                    <b-button @click="toRentalPage">Start Rental Application</b-button>
                    <br>
                    <br>
                    <b-button v-if="!seeImages" variant="success" @click="loadImages(serverData.detailData.zpid)">See Images</b-button>
                    <h5 v-if="seeImages && modalVisible">Images</h5>
                    <ul v-if="seeImages && modalVisible">
                      <li v-for="(image, j) in imageData.imageData.images" :key="j"><img :src="image" class="propimage"></li>
                      <br>
                    </ul>

                  </b-modal>
              </section>
            </div>
          </div>
        </div>

      </div>
    </body>

  </div>
</template>

<script>
// import used for this app
import MaintenancePage from './components/maintenance.vue'
import AboutPage from './components/about.vue'
import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import querystring from 'querystring';
import emailjs from 'emailjs-com';
import { dataStore } from './data/dataStore.js'

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export default {
  
  name: 'App',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    MaintenancePage,
    AboutPage,
  },
  data () {
    return {
      currentProp: null,
      apiUrlBase: process.env.VUE_APP_SERVER_API_BASE,
      onMainPage: true,
      modalVisible: false,
      onRentalPage: false,
      onAboutPage: false,
      onMaintenancePage: false,
      onRentPage: false,
      priceIsChecked: false,
      bedIsChecked: false,
      bathIsChecked: false,
      homeIsChecked: false,
      bothAreChecked: false,
      someoneChecked: false,
      propertiesData: null,
      filteredProperties: [],
      onHousingPage: false,
      rentalname: '',
      rentalemail: '',
      rentalphonenumber: '',
      rentalproperty: '',
      rentalmoveindate: '',
      rentaladultsnum: '',
      rentalchildrennum: '',
      rentalpets: '',
      rentalincome: '',
      rentalsmoker: '',
      rentaldebts: '',
      rentalpayments: '',
      rentalcredit: '',
      rentaltimeworking: '',
      rentalindustry: '',
      rentalemployment: '',
      rentalreason: '',
      rentallease: '',
      rentaldeposit: '',
      rentalextrainfo: '',
      minprice: 0,
      maxprice: 500000,
      numbeds: 1,
      numbaths: 1,
      hometype: '',
      myMap: null,
      serverData: null,
      buttonMessage: 'Load More Info',
      notClicked: true,
      showNow: false,
      address2: null,
      seeImages: false,
      imageData: null,
      url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 12,
      center: [35.9940, -78.8986],
      bounds: null,
      user: {},
      allFavs: dataStore,
      propToAdd: null,
      favIsChecked: false,
    }
  },
  methods: {
    //to add a favorite property
    addFav (id, newProp) {
      this.allFavs.addFav(id, newProp);
    },
    //to remove a favorite property
    removeFav (id, prop) {
      var index = Object.values(this.allFavs.data[this.user.id]).indexOf(prop);
      console.log(index);
      this.allFavs.removeFav(id, index);
      this.allFavs.getData();
      this.filteredProperties = this.allFavs.data[this.user.id];
      if (Object.values(this.allFavs.data[this.user.id]).length == 0) {
        this.filteredProperties = this.propertiesData.props;
      }
    },
    //to fetch user info
    async getDBJSON(url, apiAction, queryParameters, protocolOptions) {
      const parameters = queryParameters ? `?${querystring.stringify(queryParameters)}` : '';
      const urlWithParameters = `${url}${apiAction}${parameters}`;
      console.log('getJSON', urlWithParameters);
      const response = await fetch(urlWithParameters, { credentials: 'include', ...(protocolOptions || {}) });

      // only convert response if request suceeded
      if (response.ok) {
          return response.json();
      }

      console.error(response);
      return {};
  },
    // helper for calling /api/user
    async refreshUser() {
        this.user = await this.getDBJSON('https://banana-crisp-29603.herokuapp.com/', 'api/user');
        console.log(this.user);
    },
    //helper for map
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    //helper for map
    centerUpdate(center) {
      this.currentCenter = center;
    },
    //loads individual property data for modal
    async loadData(prop) {
        this.currentProp = prop;
        this.showNow = false;
        const url = `https://banana-crisp-29603.herokuapp.com/api/get_detail?zpid=${prop.zpid}`;
        console.log(url);
        const response = await fetch(url);
        this.serverData = await response.json();
        console.log(this.serverData);
        if (this.serverData) {
            this.propertyData = this.serverData;
        } else {
            this.message = this.serverData.message;
        }
        this.modalVisible = true;
        this.seeImages = false;
        this.rentalproperty = prop.address;
    },
    //fetches image data
    async loadImages(num) {
        const url = `https://banana-crisp-29603.herokuapp.com/api/get_images?zpid=${num}`;
        console.log(url);
        const response = await fetch(url);
        this.imageData = await response.json();
        console.log(this.serverData);
        if (!this.imageData) {
          this.message = this.serverData.message;
        }
        this.seeImages = true;
    },
    //algorithm for filtering properties
    applyFilters() {
      this.filteredProperties = [];
      let i = 0;
      if (this.priceIsChecked && this.bedIsChecked && this.bathIsChecked && this.homeIsChecked) {
        while (i < this.propertiesData.props.length) {
          if (this.propertiesData.props[i].price <= this.maxprice
                && this.propertiesData.props[i].bedrooms == this.numbeds
                && this.propertiesData.props[i].bathrooms == this.numbaths
                && this.propertiesData.props[i].propertyType == this.hometype) {
            this.filteredProperties.push(this.propertiesData.props[i]);
          }
          i += 1;
        }
      }
      else if (this.priceIsChecked && this.bedIsChecked && this.bathIsChecked) {
        while (i < this.propertiesData.props.length) {
          if (this.propertiesData.props[i].price <= this.maxprice
                && this.propertiesData.props[i].bedrooms == this.numbeds
                && this.propertiesData.props[i].bathrooms == this.numbaths) {
            this.filteredProperties.push(this.propertiesData.props[i]);
          }
          i += 1;
        }
      }
      else if (this.priceIsChecked && this.bedIsChecked && this.homeIsChecked) {
        while (i < this.propertiesData.props.length) {
          if (this.propertiesData.props[i].price <= this.maxprice
                && this.propertiesData.props[i].bedrooms == this.numbeds
                && this.propertiesData.props[i].propertyType == this.hometype) {
            this.filteredProperties.push(this.propertiesData.props[i]);
          }
          i += 1;
        }
      }
      else if (this.priceIsChecked && this.bathIsChecked && this.homeIsChecked) {
        while (i < this.propertiesData.props.length) {
          if (this.propertiesData.props[i].price <= this.maxprice
                && this.propertiesData.props[i].bathrooms == this.numbaths
                && this.propertiesData.props[i].propertyType == this.hometype) {
            this.filteredProperties.push(this.propertiesData.props[i]);
          }
          i += 1;
        }
      }
      else if (this.priceIsChecked && this.bedIsChecked) {
        while (i < this.propertiesData.props.length) {
          if (this.propertiesData.props[i].price <= this.maxprice
                && this.propertiesData.props[i].bedrooms == this.numbeds) {
            this.filteredProperties.push(this.propertiesData.props[i]);
          }
          i += 1;
        }
      }
      else if (this.priceIsChecked && this.bathIsChecked) {
        while (i < this.propertiesData.props.length) {
          if (this.propertiesData.props[i].price <= this.maxprice
                && this.propertiesData.props[i].bathrooms == this.numbaths) {
            this.filteredProperties.push(this.propertiesData.props[i]);
          }
          i += 1;
        }
      }
      else if (this.priceIsChecked && this.homeIsChecked) {
        while (i < this.propertiesData.props.length) {
          if (this.propertiesData.props[i].price <= this.maxprice
                && this.propertiesData.props[i].propertyType == this.hometype) {
            this.filteredProperties.push(this.propertiesData.props[i]);
          }
          i += 1;
        }
      }
      else if (this.priceIsChecked) {
        while (i < this.propertiesData.props.length) {
          if (this.propertiesData.props[i].price <= this.maxprice) {
            this.filteredProperties.push(this.propertiesData.props[i]);
          }
          i += 1;
        }
      }
      else if (this.bedIsChecked && this.bathIsChecked && this.homeIsChecked) {
        while (i < this.propertiesData.props.length) {
          if (this.propertiesData.props[i].bedrooms == this.numbeds
                && this.propertiesData.props[i].bathrooms == this.numbaths
                && this.propertiesData.props[i].propertyType == this.hometype) {
            this.filteredProperties.push(this.propertiesData.props[i]);
          }
          i += 1;
        }
      }
      else if (this.bedIsChecked && this.bathIsChecked) {
        while (i < this.propertiesData.props.length) {
          if (this.propertiesData.props[i].bedrooms == this.numbeds
                && this.propertiesData.props[i].bathrooms == this.numbaths) {
            this.filteredProperties.push(this.propertiesData.props[i]);
          }
          i += 1;
        }
      }
      else if (this.bedIsChecked && this.homeIsChecked) {
        while (i < this.propertiesData.props.length) {
          if (this.propertiesData.props[i].bedrooms == this.numbeds
                && this.propertiesData.props[i].propertyType == this.hometype) {
            this.filteredProperties.push(this.propertiesData.props[i]);
          }
          i += 1;
        }
      }
      else if (this.bathIsChecked && this.homeIsChecked) {
        while (i < this.propertiesData.props.length) {
          if (this.propertiesData.props[i].bathrooms == this.numbaths
                && this.propertiesData.props[i].propertyType == this.hometype) {
            this.filteredProperties.push(this.propertiesData.props[i]);
          }
          i += 1;
        }
      }
      else if (this.bedIsChecked) {
        while (i < this.propertiesData.props.length) {
          if (this.propertiesData.props[i].bedrooms == this.numbeds) {
            this.filteredProperties.push(this.propertiesData.props[i]);
          }
          i += 1;
        }
      }
      else if (this.bathIsChecked) {
        while (i < this.propertiesData.props.length) {
          if (this.propertiesData.props[i].bathrooms == this.numbaths) {
            this.filteredProperties.push(this.propertiesData.props[i]);
          }
          i += 1;
        }
      }
      else if (this.homeIsChecked) {
        while (i < this.propertiesData.props.length) {
          if (this.propertiesData.props[i].propertyType == this.hometype) {
            this.filteredProperties.push(this.propertiesData.props[i]);
          }
          i += 1;
        }
      }
      else {
        this.filteredProperties = this.propertiesData.props;
      }

    },
    //send email on rentail application page
    sendEmailTwo(e) {
        try {
            console.log(e.target);
            emailjs.send('service_8es2x27', 'template_2xgnuap',
            {
            rentalname: this.rentalname,
            rentalemail: this.rentalemail,
            rentalphonenumber: this.rentalphonenumber,
            rentalproperty: this.rentalproperty,
            rentalmoveindate: this.rentalmoveindate,
            rentaladultsnum: this.rentaladultsnum,
            rentalchildrennum: this.rentalchildrennum,
            rentalpets: this.rentalpets,
            rentalincome: this.rentalincome,
            rentalsmoker: this.rentalsmoker,
            rentaldebts: this.rentaldebts,
            rentalpayments: this.rentalpayments,
            rentalcredit: this.rentalcredit,
            rentaltimeworking: this.rentaltimeworking,
            rentalindustry: this.rentalindustry,
            rentalemployment: this.rentalemployment,
            rentalreason: this.rentalreason,
            rentallease: this.rentallease,
            rentaldeposit: this.rentaldeposit,
            rentalextrainfo: this.rentalextrainfo
            }, 'user_hidok5i1A3U4Zo51VAvnj')

        } catch(error) {
            console.log({error})
        }
        // Reset form field
            this.rentalname = '';
            this.rentalemail = '';
            this.rentalphonenumber = '';
            this.rentalproperty = '';
            this.rentalmoveindate = '';
            this.rentaladultsnum = '';
            this.rentalchildrennum = '';
            this.rentalpets = '';
            this.rentalincome = '';
            this.rentalsmoker = '';
            this.rentaldebts = '';
            this.rentalpayments = '';
            this.rentalcredit = '';
            this.rentaltimeworking = '';
            this.rentalindustry = '';
            this.rentalemployment = '';
            this.rentalreason = '';
            this.rentallease = '';
            this.rentaldeposit = '';
            this.rentalextrainfo  = '';
        
        },
    //to reset filters
    resetFilters() {
      this.filteredProperties = this.propertiesData.props;
      this.minprice = 0;
      this.maxprice = 500000;
      this.numbeds = 1;
      this.numbaths = 1;
      this.hometype = '';
      this.modalVisible = false;
    },
    //price filter has been clicked
    priceClicked() {
      this.favIsChecked = false;
      this.filteredProperties = this.propertiesData.props;
      this.priceIsChecked = !this.priceIsChecked;
      this.someoneChecked = this.priceIsChecked || this.bedIsChecked || this.bathIsChecked || this.homeIsChecked;
      if (!this.someoneChecked) {
        this.resetFilters();
      }
    },
    //bedrooms filter has been clicked
    bedClicked() {
      this.favIsChecked = false;
      this.filteredProperties = this.propertiesData.props;
      this.bedIsChecked = !this.bedIsChecked;
      this.someoneChecked = this.priceIsChecked || this.bedIsChecked || this.bathIsChecked || this.homeIsChecked;
      if (!this.someoneChecked) {
        this.resetFilters();
      }
    },
    //bathrooms filter has been clicked
    bathClicked() {
      this.favIsChecked = false;
      this.filteredProperties = this.propertiesData.props;
      this.bathIsChecked = !this.bathIsChecked;
      this.someoneChecked = this.priceIsChecked || this.bedIsChecked || this.bathIsChecked || this.homeIsChecked;
      if (!this.someoneChecked) {
        this.resetFilters();
      }
    },
    //type of home filter has been clicked
    homeClicked() {
      this.favIsChecked = false;
      this.filteredProperties = this.propertiesData.props;
      this.homeIsChecked = !this.homeIsChecked;
      this.someoneChecked = this.priceIsChecked || this.bedIsChecked || this.bathIsChecked || this.homeIsChecked;
      if (!this.someoneChecked) {
        this.resetFilters();
      }
    },
    //only display favorite properties
    favsClicked() {
      this.favIsChecked = !this.favIsChecked;
      if(this.favIsChecked) {
        this.filteredProperties = this.allFavs.data[this.user.id];
      }
      else {
        this.filteredProperties = this.propertiesData.props;
      }
    },
    //take user to pay rent page
    toRentPage () {
      this.onMainPage = false;
      this.onRentPage = true;
    },
    //take user to rental application page
    toRentalPage () {
      this.priceIsChecked = false;
      this.bedIsChecked = false;
      this.bathIsChecked = false;
      this.homeIsChecked = false;
      this.onMainPage = false;
      this.onHousingPage = false;
      this.onRentalPage = true;
      this.filteredProperties = this.propertiesData;
    },
    //take user to request maintenance page
    toMaintenancePage () {
      this.onMainPage = false;
      this.onMaintenancePage = true;
    },
    //take user to available housing page
    toHousingPage () {
      this.filteredProperties = this.propertiesData.props;
      this.onMainPage = false;
      this.onHousingPage = true;
    },
    //take user to About Us page
    toAboutPage () {
      this.onMainPage = false;
      this.onAboutPage = true;
    },
    //takes user back to Home page
    toHomePage () {
      this.resetFilters();
      this.priceIsChecked = false;
      this.bedIsChecked = false;
      this.bathIsChecked = false;
      this.homeIsChecked = false;
      this.rentalproperty = null;
      this.onMainPage = true;
      this.onRentPage = false;
      this.onHousingPage = false;
      this.onAboutPage = false;
      this.onMaintenancePage = false;
      this.onRentalPage = false;
      this.priceIsChecked = false;
      this.sqftIsChecked = false;
      this.someoneChecked = false;
    },
    //helper for map
    setLocation(position) {
            this.location = {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            };
            this.getServerData();
        },
        // get data from server to display
        async getServerData() {
            this.allFavs = dataStore;
            // cannot access server without user's location
            // get JSON data from server and use to update app's variables
            const url = `https://banana-crisp-29603.herokuapp.com/api/get_data`;
            console.log(url);
            const response = await fetch(url);
            const serverData = await response.json();
            // ensure valid response (HTTP-status is 200-299)
            // and expected data (not error JSON object)
            console.log(serverData);
            if (serverData) {
                // convert server data into Vue data or update existing Vue data
                this.propertiesData = serverData.propertiesData;
            } else {
                // may not always be wise to simply echo given error
                this.message = serverData.message;
            }
        },
  },
  async mounted () {
    this.getServerData();
    this.refreshUser();
    this.allFavs.getData();
    console.log(this.serverData);
  },
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}
body {
  background-image: linear-gradient(to bottom right, rgb(240, 198, 192), rgb(196, 116, 116), rgb(240, 198, 192));
  background-attachment: fixed;
}
#logo {
  float: left;
  margin-left: 55px;
  max-height: 200px;
  position: absolute;
}
.button {
  font-size: 1000px;
  float: right;
  list-style-type: none;
  margin-right: 50px;
  margin-top: 60px;
  list-style-position:inside;
  padding: 10px;
  border-radius: 20px;
  border: solid rgb(75, 77, 76);
  background-color: rgb(247, 217, 227);
}
.homebutton {
  font-size: 1000px;
  float: left;
  list-style-type: none;
  margin-left: 15px;
  margin-top: 20px;
  list-style-position:inside;
  padding: 10px;
  border-radius: 20px;
  border: solid rgb(75, 77, 76);
  background-color: rgb(247, 217, 227);
}
#pages {
  margin-right: 275px;
}
.page {
  font-size: 1000px;
  float: right;
  list-style-type: none;
  margin-right: 50px;
  margin-top: 60px;
  margin-block: 60px;
  list-style-position:inside;
  padding: 10px;
  border-radius: 20px;
  border: solid rgb(75, 77, 76);
  background-color: rgb(247, 217, 227);
  text-align: center;
  max-width: 160px;
}
.lesspages {
  font-size: 1000px;
  float: right;
  list-style-type: none;
  margin-right: 50px;
  margin-top: 60px;
  margin-block: 60px;
  list-style-position:inside;
  padding: 10px;
  border-radius: 20px;
  border: solid rgb(75, 77, 76);
  background-color: rgb(247, 217, 227);
  text-align: center;
  max-width: 160px;
}
#bottom {
  margin-top: 250px;
  margin-bottom: 30px;
  text-align: center;
}
#buttons {
  margin-right: 100px;
}
#title {
  font-family: Avant Garde,Avantgarde,Century Gothic,CenturyGothic,AppleGothic,sans-serif;
  list-style-type: none;
  float: left;
  margin-left: 250px;
  margin-top: 60px;
}
#adminmessage {
  font-family: Avant Garde,Avantgarde,Century Gothic,CenturyGothic,AppleGothic,sans-serif;
}
a {
  color: black;
}
#mainimage {
  margin-left: 400px;
  margin-top: 75px;
  border: solid black;
}
#rentmessage {
  max-width: 70%;
  margin-left: 270px;
}
#HousingPage {
  margin: 25px;
}
.houseimg {
  border: solid black;
  margin-bottom: 15px;
  max-width: 400px;
}
.dropdown {
  margin-bottom: 45px;
}
#aboutus {
  margin: 25px;
}
.Maintenancepage {
  margin: 25px;
}
.container {
  display: block;
  margin: 25px;
  border-radius: 5px;
  background-color: #f1d8ca;
  padding: 20px;
  width: 50%;
}

label {
  float: left;
}

input[type=text], [type=email], textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}
#map {
  height: 600px;
  width: 1000px;
  float: left;
  padding: 20px;
  margin-top: -20px;
}
#propertieslist {
  float: right;
  width: 300px;
  float: left;
  padding: 20px;
  height: 657px;
  padding-right: 50px;
  box-sizing: content-box;
  overflow-y: auto;
  margin-bottom: 30px;
  margin-top: -40px;
}
#content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-top: 20px;
}
.property {
  margin-bottom: 15px;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 5px;
  padding: 8px;
  background-color: rgb(247, 217, 227);;
}
.property:hover {
  background-color: rgb(247, 189, 178);;
}
.homebutton:hover {
  background-color: rgb(247, 189, 178);;
}
.page:hover {
  background-color: rgb(247, 189, 178);;
}
.lesspages:hover {
  background-color: rgb(247, 189, 178);;
}
.button:hover {
  background-color: rgb(247, 189, 178);;
}
.indent {
  margin-left: 12px;
}
#pricelabel {
  float: right;
  margin-right: 1258px;
}
#priceinputlabel {
  margin-right: 10px;
}
#priceinput {
  float: left;
  margin-left: 10px;
}
#bedlabel {
  float: right;
  margin-right: 1140px;
}
#bathlabel {
  float: right;
  margin-right: 1135px;
}
#homelabel {
  float: right;
  margin-right: 1193px;
}
#favslabel {
  float: right;
  margin-right: 1162px;
}
#entrybox {
  border: 2px solid rgb(0, 0, 0);
  border-radius: 5px;
  height: 125px;
  width: 1020px;
  float: right;
  margin-top: -150px;
  padding: 8px;
}
#filterbutton {
  float: right;
  margin-top: 25px;
}
#resetbutton {
  float: right;
  margin-top: 60px;
  margin-right: -105px;
}
.entryinput {
  width: 5px;
}
.filters {
  margin-right: 20px;
}
li {
  list-style-type: none;
  float: left;
}
.bedbathfilterlabel {
  margin-right: 3px;
}
#filtersforprice {
  width: 200px;
  margin-right: -20px;
}
.moreinfobutton {
  margin-left: 12px;
}
.propimage {
  width: 300px;
  margin-bottom: 10px;
}
#maintenaceheader {
  margin-left: 25px;
}
input[type=text], [type=email], textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.container {
  display: block;
  margin: 25px;
  border-radius: 5px;
  background-color: #f1d8ca;
  padding: 20px;
  width: 50%;
}
#centermore {
  margin-right: 218px;
}
</style>
