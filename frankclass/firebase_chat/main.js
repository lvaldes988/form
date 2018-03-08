// // Save data to the current local store

var session = localStorage.getItem("session");


if (session) {
  // Login the client and render ChatScreen
}
else {
  $('#root').append(LoginScreen());
  loginScreenEvents();
}

