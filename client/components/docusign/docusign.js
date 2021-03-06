/*
const docusign = require('../src/index');
const apiClient = new docusign.ApiClient();
*/
const express = require('express');
const docusign = require('docusign-esign');
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const apiClient = new docusign.ApiClient();

const integratorKey = '06172041-3746-49d1-8e07-f7b448b31aa8'; // An IK for a non-mobile docusign account
const integratorKeyImplicit = '81ce3c50-6ca9-40df-8f26-26e4e1e06f9d'; // an IK with mobile selected in Docusign admin
const clientSecret = 'ae80f8be-2315-4711-813d-c79b90d44349';
const redirectUri = 'http://localhost:3000/auth';
const basePath = 'https://demo.docusign.net/restapi';

const responseTypeCode = apiClient.OAuth.ResponseType.CODE; // Response type of code, to be used for the Auth code grant
const responseTypeToken = apiClient.OAuth.ResponseType.TOKEN; // Response type of token, to be used for implicit grant
const scopes = [apiClient.OAuth.Scope.EXTENDED];
const randomState = '*^.$DGj*)+}Jk'; // after successful login you should compare the value of URI decoded "state" query param with the one created here. They should match



apiClient.setBasePath(basePath);

// Auth Code Grant

app.get('/', function (req, res) {
    const authUri = apiClient.getAuthorizationUri(integratorKey, scopes, redirectUri, responseTypeCode, randomState);//get DocuSign OAuth authorization url
     //Open DocuSign OAuth login in a browser, res being your node.js response object.
    res.redirect(authUri);
});

app.get('/auth', function (req, res) {
  // IMPORTANT: after the login, DocuSign will send back a fresh
  // authorization code as a query param of the redirect URI.
  // You should set up a route that handles the redirect call to get
  // that code and pass it to token endpoint as shown in the next
  // lines:
  apiClient.generateAccessToken(integratorKey, clientSecret, req.query.code, function (err, oAuthToken) {

    console.log(oAuthToken);

    apiClient.getUserInfo(oAuthToken.accessToken, function (err, userInfo) {
      console.log("UserInfo: " + userInfo);
      // parse first account's baseUrl
      // below code required for production, no effect in demo (same
      // domain)
      apiClient.setBasePath(userInfo.accounts[0].baseUri + "/restapi");
      res.send(userInfo);
    });
  });
});


// Implicit Grant
/*
app.get('/', function (req, res) {
    const authUri = apiClient.getAuthorizationUri(integratorKeyImplicit, scopes, redirectUri, responseTypeToken, randomState);//get DocuSign OAuth authorization url
     //Open DocuSign OAuth login in a browser, res being your node.js response object.
    res.redirect(authUri);
});

app.get('/auth', function (req,res) {
  // IMPORTANT: after the login, DocuSign will send back a new
  // access token in the hash fragment of the redirect URI.
  // You should set up a client-side handler that handles window.location change to get
  // that token and pass it to the ApiClient object as shown in the next
  // lines:
  res.send();
});

app.get('/auth/:accessToken', function (req, res) {
  // This a sample endpoint to allow you to pass in the previously received accesstoken to log in via getUserInfo
  // ex: http://localhost:3000/auth#access_token=<token>&expires_in=<expiresIn>&token_type=<tokenType>&state=<randomState>
  // ex: http://localhost:3000/auth/<token>

  const accessToken = req.params.accessToken;

  apiClient.getUserInfo(accessToken, function (err, userInfo) {
    if (err)
      console.log(err)

    console.log("UserInfo: " + userInfo);
    // parse first account's baseUrl
    // below code required for production, no effect in demo (same
    // domain)
    apiClient.setBasePath(userInfo.accounts[0].baseUri + "/restapi");
    res.send(userInfo);
  });
});
*/

app.listen(port, host, function (err) {
  if (err) { throw err; }

  console.log('Your server is running on http://' + host + ':' + port + '.');
});
