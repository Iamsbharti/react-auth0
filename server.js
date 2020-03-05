const express = require("express");

//bring all the env variables

require("dotenv").config();
const jwt = require("express-jwt"); //Validate JWT and seq.user
const jwksRsa = require("jwks-rsa"); //Retrieve RSA keys from a JSON web key set (JKWS)endpoint
const checkScope = require("express-jwt-authz"); //validate JWT scopes

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

//Host getCources endpoint
app.get("/cource", checkJwt, checkScope(["read:cources"]), function(req, res) {
  res.json({
    cources: [
      { id: 1, title: "Building Apps with React and Redux" },
      { id: 2, title: "Creating Reusable React Components" }
    ]
  });
});
//check Role express middleware
function checkRoles(role) {
  return function(req, res, next) {
    const assignedRoles = req.user["http:localhost:3000/roles"];
    if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
      return next();
    } else {
      return res.status(401).send("Insufficient role");
    }
  };
}
//Host Admin role endpoint
app.get("/admin", checkJwt, checkRoles("admin"), function(req, res) {
  res.json({
    message: "Hello from admin API"
  });
});
app.listen(3001);
console.log(
  "PUBLIC API server listining on" + process.env.REACT_APP_AUTH0_AUDIENCE
);
