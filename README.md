# sample-aut0-m2m-management-api
Implements how to connect a server with Auth0 APIs. In this repo we are connecting with [Auth0 Management API](#auth0-management-api).
This is an example of connection to the API with test purposes, so I am not securing the endpoint. If you want to use it, you should secure the endpoints, so only authenticated users can access to the resources.

## Using this repository 

### Requirements
* node and npm
* [Auth0 account](https://auth0.com/)

### Configure the enviroment
On the root path of the project, you have to create a ```.env``` file (you can copy the *.env.template*) and set your app values.

## Auth0 Management API
This Auth0 API is meant to be used by back-end servers or trusted parties performing administrative tasks. Generally speaking, anything that can be done through the Auth0 dashboard (and more) can also be done through this API. You can read the [documentation](https://auth0.com/docs/api/management/v2) to check all the information.

## Create a machine to machine Application
You have to create an [Auth0 application](https://manage.auth0.com/#/applications). You can see a tutorial on how to create in this post [Auth0 Machine to Machine Applications](https://auth0.com/docs/applications/machine-to-machine).

We have to select the scopes that our app will access. In this project, we select:
* read:users
* read:users_app_metadata
* read:user_idp_tokens
* read:logs 

## Project
This server exposes an API, by default in *http://localhost:3000*.
To start the server, run ```npm start```

### /users
Retrieves the data of the users that have signed in one of our application. Read the documentation [*/users*](https://auth0.com/docs/api/management/v2#!/Users/get_users) for the different query parameters.

### /logs
Retrieves the logs of our tenant. Read the documentation [*/logs*](https://auth0.com/docs/api/management/v2#!/Logs/get_logs) for the different query parameters.

## Documentation
You can find more documentation about machine to machine application in the following links:
* [Auth0 Machine to Machine Applications](https://auth0.com/docs/applications/machine-to-machine)
* [Using Machine to Machine (M2M) Authorization](https://auth0.com/blog/using-m2m-authorization/)