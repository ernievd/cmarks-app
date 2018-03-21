# CMarks

When attending lectures, conferences, or any event where audience members are learning new information, typically, audience members would like to review what they have learned. The CMarks web application gives audience members the ability to do so via audio recording. CMarks enables users to timestamp significant points of a presentation allowing them to review/listen to the points in time that they thought were noteworthy. 

## Built With

- PostgreSQL 
- AngularJS
- Angular Material
- Node.js 
- Express.js 
- Passport.js 
- JavaScript 
- Filestack API
- Google OAuth
- LinkedIn OAuth
- Moment.js
- Angular Moment Picker

## Getting Started

- Fork and clone
- ```npm install```

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- PostgreSQL (https://www.postgresql.org/)


### Installing

Steps to get the development environment running.

```sql
CREATE TABLE users (
	id serial primary key,
	auth_key varchar(240) UNIQUE
);

CREATE TABLE events (
	id serial primary key,
	speaker_id int references users(id) not null,
	speaker_name varchar(100) not null,
	title varchar(100) not null,
	location varchar(100),
	date date not null,
	start_time time not null,
	join_code varchar(4),
	audio_url varchar(240),
	completed boolean default 'false'
);

CREATE TABLE cmarks (
	id serial primary key,
	user_id int references users(id) not null,
	event_id int references events(id) not null,
	timestamp time not null,
	comment varchar(255) default null
);
```

## Screen Shot

![alt text](https://github.com/ernievd/cmarks-app/blob/master/Screen%20Shot%202018-03-19%20at%207.38.30%20AM.png "Landing Page")
![alt text](https://github.com/ernievd/cmarks-app/blob/master/Screen%20Shot%202018-03-19%20at%207.38.41%20AM.png "Join Event Page")
![alt text](https://github.com/ernievd/cmarks-app/blob/master/Screen%20Shot%202018-03-19%20at%207.46.14%20AM.png "Manage Events Page")
![alt text](https://github.com/ernievd/cmarks-app/blob/master/Screen%20Shot%202018-03-19%20at%207.53.48%20AM.png "Events Page")

### Completed Features

High level list of items completed.

- [x] Authentication through Google
- [x] Authentication through LinkedIn
- [x] Navigation menu (Hamburger Menu)
- [x] Speaker’s “Manage Events” View (their events displayed)
- [x] Speaker can add a new event, which generates a random join code
- [x] Speaker can edit events (adjust time, change event title, change location)
- [x] Speaker can upload audio file to an event
- [x] “Join Event” view (audience members enter code to join event)
- [x] “Event” view (swiping up saves timestamp for a particular event)
- [x] “My Events” view (display audience member’s events)
- [x] “Listen with CMarks” view - audio loaded into browser’s built-in player
- [x] Audience member’s saved CMarks listed on “Listen with CMarks” view, plays audio clip
- [x] Audience members can comment on individual CMarks 

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Email notifications to notify users when audio has been uploaded to a specific event.
- [ ] Responsive and working on safari mobile. 
- [ ] Aggregate CMarks made by audience members at events and provide data to speakers for insight on their performance.

## Authors

* Ian Robertson, Amy Richardson, Ernie Van Duyne, Ross Denison  


## Acknowledgments

* Thank you to Chris Carlson, Kris Szfranski, Dane Smith and Luke Schlangen.
