const LoginScreen = () => {
  let container = document.createElement('div');

  $(container).html(`
    <div id="login_screen" class="login-container">
      <div class="logo-container">
        <span class="ion-ios-chatboxes icon"></span>
      </div> 
      <div class="inputs-container">
        <div class="input-container">
          <div class="input-title">Email:</div>
          <div class="input-wrapper">
            <input id="email" class="input" type="text" />
          </div>
        </div>
        <div class="input-container">
          <div class="input-title">Password:</div>
          <div class="input-wrapper">
            <input id="password" class="input" type="password" />
          </div>
        </div>
        <div class="icons-container">
          <div id="google_icon" class="google-icon icon-hover"></div>
          <div id="facebook_icon" class="facebook-icon icon-hover"></div>
        </div>
      </div>
      
      <div class="btn-container">
        <div id="signup_btn" class="btn accent-color-2">SIGN UP</div>
        <div id="signin_btn" class="btn accent-color-1">SIGN IN</div>
      </div>
    </div>
  `);

  return container;
}

function loginScreenEvents() {
  $('#root').on('click', '#google_icon', googleLogin);

  $('#root').on('click', '#signup_btn', function(){
    $('#login_screen').fadeOut("slow", function () {
      $('#root').html(SignUpScreen());
      signUpScreenEvents();
    });
  });

  $('#root').on('click', '#signin_btn', function(){
    let email = $('#email').val();
    let password = $('#password').val();

    if (validateEmail(email) && validatePassword(password)){
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(result){
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result;

        // localStorage.setItem("session", JSON.stringify({
        //   token: token,
        //   method: 'google'
        // }));

        console.log('user ', user);

        $('#login_screen').fadeOut("slow", function () {
          $('#root').html(ChatScreen(user));
          chatScreenEvents(user);
        });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log('error message ', errorMessage);
      });
    }
  });
}