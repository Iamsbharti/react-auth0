const express = require("express");

//bring all the env variables

require("dotenv").config();
const jwt = require("express-jwt"); //Validate JWT and seq.user
const jwksRsa = require("jwks-rsa"); //Retrieve RSA keys from a JSON web key set (JKWS)endpoint

const checkJwt = jwt({
  //Dynamically provide a signing key based on the Kid in the header
  //and the sigining keys provided by the JWKS endpoint

  secret: jwksRsa.expressJwtSecret({
    cache: true, //cache the signing key
    rateLimit: true,
    jwksRequestsPerMinute: 5, //prevent attackers from requesting more than 5 per minute
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  //validate the audience and the issuer
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

  //This must match the alogorith selected in the AUTH0 dasboard under your app's advanced settings under the oAuth tab
  algorithms: ["RS256"]
});

//Initialize exprees
const app = express();

//Host the public  endpoint
app.get("/public", function(req, res) {
  res.json({
    message: "Hello from a Public API"
  });
});

//Host the private  endpoint
app.get("/private", checkJwt, function(req, res) {
  res.json({
    message: "Hello from a Private API"
  });
});

app.listen(3001);
console.log(
  "PUBLIC API server listining on" + process.env.REACT_APP_AUTH0_AUDIENCE
);
