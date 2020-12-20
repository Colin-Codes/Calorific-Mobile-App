# Calorific
JavaScript, SQL, BootStrap: A mobile application built using the PhoneGap tooling (https://phonegap.com/) to deploy mobile apps using web technology. The app allows users to diarise their calorie intake and add new food types including the use of the device camera to add images.

## Try the app
The PhoneGap software is required to demonstrate the application in a mobile deployment, however, as the application is built using client-side web technology it will work in a limited scope locally by opneing a html file in your browser of choice.

## A detailed report (Calorific overview.pdf)
This readme file is intended to give the reader a quick overview, a more detailed report is located at the root folder.

## Construction
The PhoneGap software provided a means of building and deploying demo apps directly to a mobile device for user testing. The main difficulty proved to be writing the SQL to power the persistency of the application. As the app was powered by SQL-lite, I had no SQL editor or DB administration interface. This meant that development of the data side of the application was a painful process of trial and error. Additionally, the application had to be sufficiently robust that it could create it's own database structures every time it was opened on a new device.

## Architecture
The application and it's html files are very lean, and the meat of the functionality is in the js files (/js/).

## Highlights
* The use of BootStrap allowed for rapid development of a professional looking interface without having to produce lots of html or css. 
* The code is compact and maintainable, with well-named functions 
* The application is very robust, having been deployed and tested on a mobile device

## Future development
* The footer section was common throughout - some means of abstracting this into a template html file would have made this easier to maintain.
* A seperate back-end would allow the data side of the application to be extended and maintained much more easily, although this would force the application to be online-only.
* Alternatively serialisation as json files may have been easier to work with - this would also have allowed a more object-oriented approach
