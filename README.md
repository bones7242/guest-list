# Guestmate
*The premiere cloud-based guest-list solution for concert venues.*

In this modern age, concert venues still rely on pen or pencil, crumpled napkins, and hand written notes to compile the guest lists for their events.  This requires a lot of leg work to coordinate, and often results in names being left off or recorded incorrectly on the list.  Guestmate is a web-based guest list application that provides a reliable, accurate, real-time alternative to the antiquated pen and paper method. 

Inspired by Spotify UI/UX and Ticketmaster data analytics. Guestmate is built specifically for music venues, touring bands and the fans that support it all.  In guestmate, concert venues can keep a list of their upcoming events and the guest lists associated with those shows.  At the time of the event, the venue can log in to check guests off the list, or review handy analytics after the show.  For Artists, Guestmate provides an easy single-point-of-contact way to manage their guest list across all the venues on their tour.  This allows them to quickly edit their lists painlessly and remotely, so they can stop worrying about logistics and focus on the gig.  For fans, press, and the like, Guestmate provides a place to view what shows they have been guest-listed for and their access level, providing peace of mind that when they arrive they will be able to enter quickly and easily.  With Guestmate, guests know they will spend less time waiting outside, and more time in the venue having fun.

Guestmate is written in React, utilizing Materialize for front end styling, Redux for application-level state, Express for the back end server, and Mongoose for mongoDB data storage.

[Application overiew - powerpoint presentation](https://docs.google.com/presentation/d/16AuuNiVx-6C_qLy8eopBgdTxHk44lBssERGpnRnCYJc/edit?usp=sharing)

[Live application](http://www.guestmate.io)

### Authors: 
@billbitt
@likane
@tbikhram
@ginopark

### How to use locally 
* clone this repo
* run `npm install`
* start MongoDB
* run `webpack`
* run `npm start`
* visit [http://localhost:3000]("http://localhost:3000")

### How to contribute
If you would like to contribute, we would welcome your help.  Contact us with a brief explanation of your fix/enhancement by opening an issue, and we will let you know if we are already working on it or if we would be open to a PR.  Here are a list of roadmap features we would like to implement and would welcome PRs on:
* front end validation on all client side forms
* error handling for error's from Mongoose
* testing via Mocha or other framework
* improved email functionality
* more user roles

### Application flow

+ Upon visiting Guestmate, the user is presented with the option to log in to an existing account or create a new account for their venue
+ After logging in, the user is presented with a dashboard that shows all of the venues upcoming events.
 + Users can register as either a venue owner, venue staff (non-editing priviledges, future development), an artist (future development), or a guest (future development)
+ In preparation for upcoming events, the venue owner can organze their events and guest lists:
 + add new events
 + add new guests to an event's guest list
 + edit an existing event 
 + edit a guest's information
+ When a guest is added to the guest list, the venue has the option to send them an automated email or text message that includes the event details (current in development)
 + this provides a marketing opportunity to the guest, which can be improved by utlizing guest analytics
+ At the time of the event, the venue owner can navigate to the event page and check in guests off the guest list as they arrive at the venue
+ After the event, the venue owner can view analytics regarding their guests

### Wire-frame
This wireframe is a peak into our development process.  In order to efficiently move data and provide a seamless user expreience, we spent extensive time diagramming the application flow not just to improve UI/UX, but also to ensure that our data would flow properly through the various react components.

![wireframe](http://i.imgur.com/8y71XDD.png)

### Tech used
+ CSS
+ materialize
+ passport
+ passport-local
+ react
+ react-router
+ redux
+ express
+ body-parser
+ mongoose
+ mongoDB
+ passport

### Screen Shots
![Login](http://i.imgur.com/qIqqwMN.png)

![dashboard](http://i.imgur.com/zPxG0rH.png)
