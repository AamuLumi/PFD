# Server

## How to use

To add new entities to the server, add a folder in the `server/entities/` folder with the name of your entity, and add 3 files :
 - <your_entity>.controller.js : it will contains the controller of the entity (Express methods to call, model statics methods, ...).
 - <your_entity>.model.js : it will contains the model of your entity, and call the controller of the entity with the model to populate it.
 - <your_entity>.route.js : it will contains an Express router with different calls to Express controller methods.
 
There's no need to add routes to `server/config/routes.js`, because routes are loaded automatically at the launching of the server.

## Routes

## Authentication