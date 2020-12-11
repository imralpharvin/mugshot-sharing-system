'use strict'

//Http
// Express App (Routes)
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
const fileUpload = require('express-fileupload');
const crypto = require('crypto');

app.use(fileUpload());
app.use(bodyParser.json());

const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');
const CryptoJS = require('crypto-js');

const enrollAdmin = require('./api/enrollAdmin');
const registerUser = require('./api/registerUser');
const registerPoliceDepartment = require('./api/registerPoliceDepartment');
const queryPoliceDepartmentByID = require('./api/queryPoliceDepartmentByID');
const queryAllPoliceDepartments = require('./api/queryAllPoliceDepartments');


let currentUser;

app.get('/admin', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/admin.html'));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/profile', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/profile.html'));
});

app.get('/policedepartments', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/policedepartments.html'));
});

app.get('/admin.js', function (req, res) {
  fs.readFile(path.join(__dirname + '/public/admin.js'), 'utf8', function (err, contents) {
    const minimizedContents = JavaScriptObfuscator.obfuscate(contents, { compact: true, controlFlowFlattening: true });
    res.contentType('application/javascript');
    res.send(minimizedContents._obfuscatedCode);
  });
});

app.get('/index.js', function (req, res) {
  fs.readFile(path.join(__dirname + '/public/index.js'), 'utf8', function (err, contents) {
    const minimizedContents = JavaScriptObfuscator.obfuscate(contents, { compact: true, controlFlowFlattening: true });
    res.contentType('application/javascript');
    res.send(minimizedContents._obfuscatedCode);
  });
});

app.get('/profile.js', function (req, res) {
  fs.readFile(path.join(__dirname + '/public/profile.js'), 'utf8', function (err, contents) {
    const minimizedContents = JavaScriptObfuscator.obfuscate(contents, { compact: true, controlFlowFlattening: true });
    res.contentType('application/javascript');
    res.send(minimizedContents._obfuscatedCode);
  });
});

app.get('/policedepartments.js', function (req, res) {
  fs.readFile(path.join(__dirname + '/public/policedepartments.js'), 'utf8', function (err, contents) {
    const minimizedContents = JavaScriptObfuscator.obfuscate(contents, { compact: true, controlFlowFlattening: true });
    res.contentType('application/javascript');
    res.send(minimizedContents._obfuscatedCode);
  });
});

app.post('/enrollAdmin', function (req, res) {
  console.log("*****Enroll Admin POST request*****");
  enrollAdmin.enrollAdmin();
  res.redirect('/');
  res.end();

});

app.post('/registerPoliceDepartment', async function (req, res) {

  console.log("*****Register Police Department POST request*****");
  let department = req.body;

  //Register and enroll application identity
  await registerUser.registerUser(department);
  //Register account in blockchain
  await registerPoliceDepartment.registerPoliceDepartment(department);

  //Create front end file
  let userFilePath = 'users/' + department["policedepartmentid"] + '.txt';
  //console.log(userFilePath);
  fs.writeFile(userFilePath, department["password"], (err) => {

      if (err) throw err;
  });
  res.end();

});

app.post('/logIn', async function (req, res, next) {
  console.log("*****Log In POST request*****");
  let credentials = req.body;
  currentUser = credentials["username"];
  let passwordAttempt = credentials["password"];
  console.log("*****Current User: " + currentUser + "*****");

  let filePath = 'users/' + currentUser + '.txt';
  let password = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});

  if(passwordAttempt != password){
      next("*****ERROR:Password is incorrect*****");
  }

  res.end();

});

app.get('/loadProfile', async function (req, res) {
  console.log("*****Load Profile GET request*****");
  console.log("*****Current User: " + currentUser + "*****");
  let departmentQuery = await queryPoliceDepartmentByID.queryPoliceDepartmentByID(currentUser);
  let department = departmentQuery[0]["Record"];
  //console.log(account);
  res.send(department);

});

app.get('/loadPoliceDepartments', async function (req, res) {
  console.log("*****Load Police Departments GET request*****");
  console.log("*****Current User: " + currentUser + "*****");

  let departments = await queryAllPoliceDepartments.queryAllPoliceDepartments(currentUser);
  //console.log(account);
  res.send(departments);

});

app.listen(8080, function(){
  console.log('Listening on port 8080');
});
