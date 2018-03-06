CREATE TABLE users (
	id serial primary key,
	username varchar(50) UNIQUE,
	password varchar(100),
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
	timestamp time not null
);