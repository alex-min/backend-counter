# Backend counter

This project is a part of a prototype of an adserver.
The main goal is to maintain a counter which goes from 0 to 10 by incrementing it and then back to zero by decrementing it.

There are two endpoints at the moment


- ```/get``` increments the counter and return a json ```{"result":"ok"}```
- ```/status``` returns the current counter value example: ```{"result": 4}```

If the call succeed, the HTTP code will be 200, otherwise, it returns a 500 code.

## Project setup

The project is can be setup with [docker-compose](https://docs.docker.com/compose/) and [docker](https://docs.docker.com).

To run the project, just execute

```shell
docker-compose up
```
in the project directory to get started. The backend is then accessible on port 5001.

You can try:

```
$ curl http://localhost:5001/get
{"result":"ok"}
$ curl http://localhost:5001/status
{"result":1}
```
To get started.

## Tests

The test are available in the spec/ directory. All the files in support are automatically loaded when running the tests.
Please add new test configurations under spec/support.

To run the tests just execute

```shell
docker-compose run api npm test
```

Unit tests are under spec/unit
There is also a load test at spec/load_test.sh which is executed when runing the whole tests.

## Architecture

The project is using redis as a in-memory database and node as a the backend technology.
The backend is decoupled from the database so any number of backend instances can be deployed within the same redis instance without any issues.

The counter logic leaves on the database as a LUA procedure so there is no concurency issues on the backend side.
Node has been chosen for consistency for the prototype since it's aready used on other backends.

## Setup on production

The docker images are currently optimised for development purpose but can also be used in production.

To use this project in production without docker, some environement variables can be changed in production:

 - ```REDIS_URL=redis://username:password@example.com:5555/database```
   if the backend runs with a ```REDIS_URL``` environement variable, it overides the redis configuration to use another redis instance.
 - ```PORT=80```
   by default, the backend runs on port 80 but the ```PORT``` environement variable can change that.
 - To avoid reloading, the server can use node directly instead of nodemon which reloads on changes.

By default, all the logging goes into STDOUT so it might be useful to redirect it to a log aggregator.
