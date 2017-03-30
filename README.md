# guest-list


### React.JS, Redux, es6, Materialize, Moment, Node.JS, Nodemailer and more.

# Guestmate
*The premiere cloud-based guest-list solution for concert venues.*

In this modern age, concert venues still rely on pen and paper, crumpled napkins, and hand written notes to compile the guest lists for their events.  This requires a lot of leg work to coordinate, and often results in names being left off or recorded incorrectly on the list.  Guestmate is a web-based guest-list application provides a reliable alternative to the pen and paper methd. 

Inspired by Spotify UI/UX and Ticketmaster data analytics. Guestmate is built specifically for music venues, touring bands and the fans that support it all.  In guestmate, concert venues can keep a list of their upcoming shows and guest lists associated with those shows.  At the time of the event, the venue can log in and check guests off the list.

Guestmate is written in React, utilizing Materialize for front end styling, Redux for application-level state, Express for the back end server, and Mongoose for mongoDB data storage.

[Application overiew - powerpoint presentation](https://docs.google.com/presentation/d/16AuuNiVx-6C_qLy8eopBgdTxHk44lBssERGpnRnCYJc/edit?usp=sharing)

[Live application](https://pacific-mountain-48488.herokuapp.com/)

### Authors: 
@billbitt
@likane
@tbikhram
@ginopark

### Project Highlights
+ Materialize with custom CSS for styling
+ React with React-router to manage views
+ Redux to manage application-level state
+ Passport.js for authentication
+ Node and Express for the back-end server and API routes
+ Mongoose ORM to handle models and communication with mongoDB database

### Application flow

+ Upon visiting Guestmate, the user is presented with the option to log in to an existing account or create a new account for their venue
+ After logging in, the user is presented with a dashboard that shows all of the venues upcoming events.
++ Users can register as either a venue owner, venue staff (non-editing priviledges, future development), an artist (future development), or a guest (future development)
+ In preparation for upcoming events, the venue owner can organze their events and guest lists:
++ add new events
++ add new guests to an event's guest list
++ edit an existing event 
++ edit a guest's information
+ When a guest is added to the guest list, the venue has the option to send them an automated email or text message that includes the event details (current in development)
++ this provides a marketing opportunity to the guest, which can be improved by utlizing guest analytics
+ At the time of the event, the venue owner can navigate to the event page and check in guests off the guest list as they arrive at the venue
+ After the event, the venue owner can view analytics regarding their guests

### Wire-frame
This wireframe is a peak into our development process.  In order to efficiently move data and provide a seamless user expreience, we spent extensive time diagramming the application flow not just to improve UI/UX, but also to ensure that our data would flow properly through the various react components.

![wireframe](http://i.imgur.com/8y71XDD.png)

### Libraries, Frameworks and other tech
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