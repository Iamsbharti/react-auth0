This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## About

This react project is a demo application to showcase Auth0 authentication in a react app.<br/>
I am using the free tier capability of auth0 which supports at max 7000 users.<br/>

It uses auth0-js package to implement auth0 sdk.<br/>

## API

Created public and private api with nodeJS (express)<br/>
Private API security is set up with Auth0 <br/>
Using jwt and jwtRSA for identification of access_token and issuer.<br/>

## Available Scripts

In the project directory, you can run:

### `npm start`

It start the client project at 'localhost:3000'<br/>
Along with API Nodejs server at 'localhost:3001'<br/>

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
