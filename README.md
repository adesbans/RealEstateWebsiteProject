Purpose
-----------------------------
The purpose of this web app is to help property owners better manage their tenants and properties while also being a resource tenants can use for multiple tasks. This web app would be for one property owner, and they would be able to login and post new listings. A prospective tenant would be able to go onto the website to see current listings and submit rental applications. A current tenant would be able to log in and pay their rent or request maintenance for their unit.


Special Instructions
-----------------------------
Simply go to the website and use the differernt buttons to navigate to different pages. Use the Log In button 
to sign in with your Gmail account so that you have the ability to create a person Favorite Properties list.


References
-----------------------------
I get my data through the Zillow API, so the data I fetch is authentic and represents actual real estate data.


Database Structure
-----------------------------
My data comes from two different sources - the Zillow API and my Firebase real-time database. I fetch real estate data through 
the Zillow API and display it on my "Available Housing" page and in one of the dropdowns in my "Rental Application" page. I use 
the Firebase real-time database to store data for individual users. When a user logs in, my app fetches their individual data 
(which is their Favorite Properties list) from Firebase. The user can add or remove data from the database, and they can also 
choose to only display their Favorite Properties on the "Available Housing" page. 


Acces/Goals for Different Users
-----------------------------
There are three different users for my website. After a user logs in, they are classified as either a potential tenant, tenant, or 
administrator. Potential tenants can view the "Available Housing" page, create a unique Favorite Properties list, and submit a 
rental application on the "Rental Application" page. A tenant has all of those abilities while also being able to pay their monthly 
rent or submit a maintenance request. Last, an adminstrator can log in and will see at the top of the page that they are in Admin 
Mode. I plan on continuing my work on this website after this semester and will improve upon the administrator's abilities.


Checking Bad Input Data
-----------------------------
The only input a user can enter intom my page is the information they enter into the Rental Application and Request Maintenance forms or 
the input they enter into the filters on the "Available Housing" Page. The data entered into the forms does not have to be checked - 
this is their personal information and they are able to enter in whatever they want. The data they enter into the filtering options can 
also be anything they want. Yet, should they enter in filtering data that does not match up with any properties, then no properties will 
be displayed.


Framework
-----------------------------
I used the Vue framework for the app. This is the only framework we used in this class and I am not very familiar with any other alternative frameworks. Vue made working on this app much easier - its ability to dynamically change data made storing values and doing calculations very easy. There were not many cons to using this framework. The main difficulty I had with it was getting different components to work properly, but this was not a huge challenge and I still elected to use this framework.
