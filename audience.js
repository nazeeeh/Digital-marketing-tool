// body=====
// $(document).ready(function(){
//     $(".sidebar-btn").click(function(){
//         $(".naviCont").toggleClass("collapse");
//     });
//   });

// Get from local storage
users = JSON.parse(localStorage.getItem("database"));

originalUsers = JSON.parse(localStorage.getItem("database"));

// Creates new storage if none exists
if (users == null) {
  users = [];
}

var src;

// Click event to add more users
document.querySelector(".addBtn").addEventListener("click", () => {
  // Radio buttons
  let userRole = "";
  if (document.getElementById("user-radio").checked) {
    userRole = "user";
    document.getElementById("roleError").innerHTML = "";
  } else if (document.getElementById("admin-radio").checked) {
    userRole = "admin";
    document.getElementById("roleError").innerHTML = "";
  } else {
    document.getElementById("roleError").innerHTML =
      "Please select a user role!";
  }

  // New user object
  newObj = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    userName: document.getElementById("username").value,
    password: document.getElementById("password").value,
    role: userRole,
    pics: src,
  };

  // Check if all inputs are filled
  if (
    newObj.firstName != "" &&
    newObj.lastName != "" &&
    newObj.email != "" &&
    newObj.userName != "" &&
    newObj.password != "" &&
    newObj.role != "" &&
    newObj.pics != null
  ) {
    if (newObj.password.length < 8) {
      document.getElementById("passwordError").innerHTML =
        "Password must be greater than 8 characters!";
      document.getElementById("password").style.borderColor = "red";
    } else if (!/[a-z]/.test(newObj.password)) {
      document.getElementById("passwordError").innerHTML =
        "Password must contain at least one lower case!";
      document.getElementById("password").style.borderColor = "red";
    } else if (!/[A-Z]/.test(newObj.password)) {
      document.getElementById("passwordError").innerHTML =
        "Password must contain at least one upper case!";
      document.getElementById("password").style.borderColor = "red";
    } else if (!/[0-9]/.test(newObj.password)) {
      document.getElementById("passwordError").innerHTML =
        "Password must contain a number!";
      document.getElementById("password").style.borderColor = "red";
    } else if (!/[ /\W|_/g]/.test(newObj.password)) {
      document.getElementById("passwordError").innerHTML =
        "Password must contain at least one special character!";
      document.getElementById("password").style.borderColor = "red";
    } else {
      document.getElementById("passwordError").innerHTML = "";
      document.getElementById("password").style.borderColor = "green";

      // Checks if username and email exist already
      let isUsername = database.find(
        (element) => element.userName == newObj.userName
      );
      let isEmail = database.find((element) => element.email == newObj.email);

      if (isUsername) {
        document.getElementById("userNameError").innerHTML =
          "Username has been taken!";
      } else if (isEmail) {
        document.getElementById("emailError").innerHTML =
          "Email has been taken!";
      } else {
        // Store user object in array
        users.push(newObj);

        // Empty text boxes
        empty();

        // Adds new user to local storage
        localStorage.setItem("database", JSON.stringify(users));

        swal("Done!", "User Added Successfully!", "success");
      }
      display();
    }
  } else {
    document.getElementById("error").innerHTML = "Fill in all input fields";
  }
});

// Display Content in HTML
function display() {
  cont = "";

  for (i = 0; i < users.length; i++) {
    cont += `
            <div class="profile"> 
            <div class="item">               
            <img src= "${users[i].pics}" style= "height: 100px; width: 100px"><br>
            </div>
            <div class="item">
            <strong>First Name</strong> : ${users[i].firstName}<br>
            </div>
            <div class="item">
            <strong>Last Name</strong> : ${users[i].lastName}<br>
            </div>
            <div class="item">
            <strong>Email</strong> : ${users[i].email}<br>
            </div>
            <div class="item">
            <strong>Username</strong> : ${users[i].userName}<br>
            </div>
            <div class="item">
            <strong>Password</strong> : ${users[i].password}<br>
            </div>
            <div class="item">
            <strong>Role</strong> : ${users[i].role}<br>
            </div>
            <div class="item">
            <button class = "delBtn" onclick="del(${i})">Delete</button>
            <button class = "editBtn" data-toggle="modal" data-target="#exampleModal" onclick="edit(${i})">Edit</button>
            </div>
         </div>`;
  }
  document.getElementById("main").innerHTML = cont;
}

display();

// Function to Delete
function del(id) {
  originalIndex = originalUsers.findIndex(
    (element) => element.userName == users[id].userName
  );

  swal({
    title: `Are you sure you want to delete ${users[id].userName}?`,
    text: "Once deleted, you will not be able to recover this user!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      originalUsers.splice(originalIndex, 1);

      users = originalUsers;
      localStorage.setItem("database", JSON.stringify(originalUsers));
      display();

      empty();

      swal("User has been deleted!", {
        icon: "success",
      });
    }
  });
}

// Function to Edit
function edit(id) {
  editUser = users[id];
  originalIndex = originalUsers.findIndex(
    (x) => x.userName == editUser.userName
  );
  document.getElementById("firstName").value = editUser.firstName;
  document.getElementById("lastName").value = editUser.lastName;
  document.getElementById("email").value = editUser.email;
  document.getElementById("username").value = editUser.userName;
  document.getElementById("password").value = editUser.password;
  src = editUser.pics;
  document.getElementById("index").value = originalIndex;
}

// Function to Update
function update() {
  let userRole = "";
  if (document.getElementById("user-radio").checked) {
    userRole = "user";
  } else if (document.getElementById("admin-radio").checked) {
    userRole = "admin";
  } else {
    document.getElementById("roleError").innerHTML =
      "Please select a user role!";
  }

  i = document.getElementById("index").value;

  let updatedRecord = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    userName: document.getElementById("username").value,
    password: document.getElementById("password").value,
    role: userRole,
    pics: src,
  };

  if (
    updatedRecord.firstName != "" &&
    updatedRecord.lastName != "" &&
    updatedRecord.email != "" &&
    updatedRecord.userName != "" &&
    updatedRecord.password != "" &&
    updatedRecord.role != "" &&
    updatedRecord.pics != null
  ) {
    originalUsers[i] = updatedRecord;
    users = originalUsers;
    swal("Done!", "User Updated Successfully!", "success");
    localStorage.setItem("database", JSON.stringify(originalUsers));
    display();

    // Empty text box
    empty();
  } else {
    document.getElementById("error").innerHTML = "Fill in all input fields";
  }
}

// Search
function search() {
  // Search box
  param = document.getElementById("search").value.toLowerCase();

  // Filter
  users = users.filter((element) =>
    element.userName.toLowerCase().includes(param)
  );

  if (
    users == null ||
    users == undefined ||
    users.length == 0 ||
    document.getElementById("search").value == ""
  ) {
    swal("No Result!", "No Record Found!", "error");
  } else {
    if (users.length == 1) {
      document.getElementById("searchResult").innerHTML =
        users.length + " record found";
    } else {
      document.getElementById("searchResult").innerHTML =
        users.length + " records found";
    }
  }
  // display cancel button
  document.querySelector(".cancel").style.display = "block";

  display();
}

// Cancel Search
function cancelSearch() {
  // Get from local storage
  users = JSON.parse(localStorage.getItem("database"));
  originalUsers = JSON.parse(localStorage.getItem("database"));

  // Display Content in HTML
  display();

  // hide cancel button
  document.querySelector(".cancel").style.display = "none";

  // Empty search box
  document.getElementById("search").value = "";
  document.getElementById("searchResult").innerHTML = "";
}

// Empty text boxes
function empty() {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  src = "";
}
