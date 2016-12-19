function signup() {
  // createUserWithEmailAndPassword
  render('signup');

  let form = document.getElementById('signup-form');
  let {email, password, password_confirm} = form;
  // let email = form.email;
  // let password = form.password;
  // let password_confirm = form.password_confirm;

  form.addEventListener('submit', submitHandler);

  // 1. No server error response
  // 2. No action for success method fot create user
  // 3. No info-error for client-side validation

  function submitHandler(e) {

    // 1. @
    // 1.5 .
    // 2. pass.length > 6
    // 3. pass === pass.confirm

    if (email.value.indexOf('@') === -1 || email.value.indexOf('.') === -1 || password.value.length < 6 || (password.value !== password_confirm.value)) {
      alert('Error credentials');
    }  else {
      firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .catch( (error) => {
          alert(error.message);
        });
    }

    e.preventDefault();
  }

}
