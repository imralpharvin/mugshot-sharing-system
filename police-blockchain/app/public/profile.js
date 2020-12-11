
$(document).ready(function () {
  console.log("*****HOME.JS*****");

  loadProfile();

  document.getElementById('policedepartmentsPage').onclick = function () {
    console.log("***** Police Departments Page Clicked*****");

    let idInfo = document.getElementById('idInfo');
    let credentials = {};
    credentials["idInfo"] = idInfo.innerHTML;

    sendIdInfo(credentials);
    window.location.href = '/policedepartments';
  };

  document.getElementById('profilePage').onclick = function () {
    console.log("***** Profile Page Clicked*****");

    let idInfo = document.getElementById('idInfo');
    let credentials = {};
    credentials["idInfo"] = idInfo.innerHTML;

    sendIdInfo(credentials);
    window.location.href = '/profile';
  };

  //Log Out
  document.getElementById('logOut').onclick = function () {
    console.log("*****Log Out Button Clicked*****");
    window.location.href = '/';
  };


  function sendIdInfo(credentials){
    $.ajax({
      type: "POST",
      url: "./sendIdInfo",
      data: JSON.stringify(credentials),
      dataType: 'text',
      contentType: "application/json",
      async: false,
      success: function (data) {
        console.log("*****SUCCESS: Send Police POST request*****");
        console.log(JSON.stringify(data));

      },
      error: function (error) {
        console.log("*****FAILURE: Send Police POST request*****");
        //let logInError = document.getElementById('logInError');
        //logInError.innerHTML = 'Incorrect Log In. Please try again';
        console.log(error);

      }
    });
  }

  //Load Account Detaisl
  function loadProfile(){
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: '/loadProfile',
      async: 'false',
      success: function (data) {
        console.log(data);

        let department = data;
        console.log(department);
        let policedepartmentname = document.getElementById('nameInfo');
        let policedepartmentid = document.getElementById('idInfo');
        let policedepartmenthash = document.getElementById('hashInfo');

        policedepartmentname.innerHTML = department["name"];
        policedepartmentid.innerHTML = department["departmentID"];
        policedepartmenthash.innerHTML = department["hash"];

      },
      fail: function (error) {
        // Non-200 return, do something with error
        console.log(error);
      }
    });
  }
});
