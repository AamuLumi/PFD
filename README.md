# PFD

_PFD_ is a solution for project management. It provides all necessary tools to manage easily a project.

## Installation

To install the solution, run `npm install`.

## Running

You just need to `npm start` to launch the solution in production mode.
It may take several seconds, because it prepare a compressed application bundle before starting the server.

Application and server will be available on `localhost:8080`.

The command will launch the HTTP server with **pm2** package, which run the server and relaunch it on crash.
To stop it, just do `npm run stop`.

## Development

If you want to develop on the solution, there's a configuration with front-end and back-end hot reloading.
To run it : `npm run dev`.

It will launch one **WebServer** for the **React** application, and one **Express** server for API.
These servers are run with **pm2**.
**Warning :** updated webapp will be on `localhost:9080'.

To stop it, just do `npm run stop`.

## Test

To run Unit Test : `npm run test`.