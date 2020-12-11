
$(document).ready(function () {

  let password = document.getElementById("addPassword")
  let confirmPassword = document.getElementById("confirmPassword");

  function validatePassword(){
    if(password.value != confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords Don't Match");
    } else {
      confirmPassword.setCustomValidity('');
    }
  }

password.onchange = validatePassword;
confirmPassword.onkeyup = validatePassword;
  //Register Police Department Function
  $('#registerPoliceDepartment').submit(function (event) {
    event.preventDefault();

    console.log("*****Register Police Department Event Clicked*****");

    let policedepartmentname = document.getElementById('addName').value;
    let policedepartmentid = document.getElementById('addID').value;
    let policedepartmenthash = document.getElementById('addHash').value;
    let password = document.getElementById('addPassword').value;

    console.log("*****Police Department Details*****")
    console.log("Police Department Name: " + policedepartmentname);
    console.log("Police Department ID: " + policedepartmentid);
    console.log("Police Department Hash: " + policedepartmenthash);

    let department = {};
    department["policedepartmentname"] = policedepartmentname;
    department["policedepartmentid"] = policedepartmentid;
    department["policedepartmenthash"] = policedepartmenthash;
    department["password"] = password;

    $.ajax(
      {
        type: "POST",
        url: "./registerPoliceDepartment",
        data: JSON.stringify(department),
        dataType: 'text',
        contentType: "application/json",
        async: false,
        success: function (data, no, yes) {
          console.log("*****SUCCESS: Register Police Department POST request*****");
          let registrationMessage = document.getElementById("registrationMessage");
          registrationMessage.innerHTML = 'User succesfully registered.';


        },
        fail: function (error) {
          console.log("*****FAILURE: Register Police Department POST request*****");
          console.log(error);
        }
      });

  });


  $('#logIn').submit(function (event) {
    event.preventDefault();

    console.log("*****Log In Event Clicked*****");

    let credentials = {};
    credentials["username"] = document.getElementById('getUsername').value;
    credentials["password"]= document.getElementById('getPassword').value;

    console.log("Username: " + credentials["username"]);

    $.ajax({
      type: "POST",
      url: "./logIn",
      data: JSON.stringify(credentials),
      dataType: 'text',
      contentType: "application/json",
      async: false,
      success: function (data) {
        console.log("*****SUCCESS: Log In Police Department GET request*****");
        console.log(JSON.stringify(data));
        window.location.href = '/profile';

      },
      error: function (error) {
        console.log("*****FAILURE: Log In Police Department GET request*****");
        let logInError = document.getElementById('logInError');
        logInError.innerHTML = 'Incorrect Log In. Please try again';
        console.log(error);

      }
    });

  });

});
