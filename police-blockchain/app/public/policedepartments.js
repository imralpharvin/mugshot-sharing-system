
$(document).ready(function () {
  console.log("*****POLICEDEPARTMENT.JS*****");

  let departmentsGlobal = {};
  loadProfile();
  loadPoliceDepartments();

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


  $(document).on("click", ".button2", function(){
      console.log("*****Buy Button Clicked*****");// Outputs the answer

      let row = $(this).closest("tr");

      console.log("Row index: " + row.index());

      console.log(departmentsGlobal[row.index() -1 ]["Record"]["hash"]);
      let hash = document.getElementById('hash');
      hash.innerHTML = "The hash for " + departmentsGlobal[row.index() -1 ]["Record"]["name"] + ": " + departmentsGlobal[row.index() -1 ]["Record"]["hash"];

  });


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

  function loadPoliceDepartments(){

    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: '/loadPoliceDepartments',
      async: 'false',
      success: function (data) {
        console.log("Department object: " +data);

        let departments = data;
        departmentsGlobal = departments;

        let noDepartments = document.getElementById('noDepartments');
        let tableContainer = document.getElementById('tableContainer');
        let departmentsTable = document.getElementById('departmentsTable');
        departmentsTable.innerHTML = "";

        if(departments.length == 0)  {
          noDepartments.innerHTML = "There are no available departments.";
          tableContainer.style.display="none";
        } else{
          noDepartments.innerHTML = "";
          tableContainer.style.display="block";
          let row = departmentsTable.insertRow(-1);
          for (let i = 0; i < 3; i++) {
            let headerCell = document.createElement("TH");
            row.appendChild(headerCell);
          }

          row.cells[0].innerHTML = "Police Department ID";
          row.cells[1].innerHTML = "Police Department Name";
          row.cells[2].innerHTML = "Action";

          console.log("No. of Departments: " + departments.length);

          for (let i = 1; i <= departments.length; i++) {
            row = departmentsTable.insertRow(-1);
            $(row).attr('id', departments[i - 1]["Key"]);
            for (let j = 0; j < 5; j++) {
              let cell = row.insertCell(-1);
            }
            console.log(departments[i - 1]);
            console.log(departments[i - 1]["Key"]);
            let department = departments[i - 1]["Record"];
            departmentsTable.rows[i].cells[0].innerHTML = department["departmentID"];
            departmentsTable.rows[i].cells[1].innerHTML = department["name"];
            departmentsTable.rows[i].cells[2].innerHTML = '<button type="button" class="button2">Get Hash</button>';
            }

          }
        },

      fail: function (error) {
        // Non-200 return, do something with error
        console.log(error);
      }
    });

  }
});
