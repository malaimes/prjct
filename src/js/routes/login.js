function login(ctx) {
  if (ctx.user) {
    return page.redirect('/profile');
  }
  render('login');

  const loginForm = document.forms['login-form'];
  const { email, password } = loginForm.elements;

  const emailFF = new FormField(email.parentNode, {
    validate: [
      'required',
      'email',
      'minLength[6]',
      'maxLength[16]'
    ],
    resetOnFocus :true,
    // validateOnInput :true,
    validateOnBlur :true,
    autoValidate :true
  });
  const passwordFF = new FormField(password.parentNode, {
    validate: [
      'required',
      'minLength[6]',
      'maxLength[20]'
    ],
    resetOnFocus :true,
    // validateOnInput :true,
    validateOnBlur :true,
    autoValidate :true
  });

  // window.field = new FormField(field.parentNode, {
  //   validate: [
  //     'required',
  //     'email'
  //   ],
  //   resetOnFocus :true,
  //   // validateOnInput :true,
  //   validateOnBlur :true,
  //   autoValidate :true
  // });

  loginForm.addEventListener('submit', submitHandler);

  function submitHandler(e) {
    const auth = firebase.auth();

    e.preventDefault();

    emailFF.validate();
    passwordFF.validate();

    if ( emailFF.isValid() && passwordFF.isValid()) {
      auth
        .signInWithEmailAndPassword(email.value, password.value)
        .then((success) => page.redirect('/profile'))
        .catch((error) => console.log(error));
    }

  }
}
