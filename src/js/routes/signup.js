function signup(ctx, next) {
  if (ctx.user) {
    return page.redirect('/profile');
  }

  render('signup');

  const signupForm      = document.forms['signup-form'];
  const errorsContainer = qs('#errors', signupForm);
  const button = qs('.btn', signupForm);
  const loadingClass = 'is-loading';
  const auth            = firebase.auth();

  function renderErrors(errors = []) {
    return errors.map(err => {
      return `
        <li class="list-group-item list-group-item-danger">
          <span>${err}</span>
        </li>
      `;
    }).join('');
  }

  function showErrors(errors = []) {
    errorsContainer.innerHTML = renderErrors(errors);
    errorsContainer.hidden = false;
  }

  function hideErrors() {
    errorsContainer.hidden = true;
    errorsContainer.innerHTML = '';
  }

  function setLoadingState() {
    button.disabled = true;
    signupForm.classList.add(loadingClass);
  }

  function unsetLoadingState() {
    button.disabled = false;
    signupForm.classList.remove(loadingClass);
  }


  function onUserCreated(user) {
    unsetLoadingState();
    const usersRef = firebase.database().ref(`users/${user.uid}`);
    // const userData = pick(user, ['uid', 'email', 'displayName', 'photoURL']);
    // usersRef.set(userData)
    //   .then(() => {
    // user.sendEmailVerification();
    page('/profile');
      // });
    console.log('Success');

  }

  function onUserCreationError(error) {
    unsetLoadingState();
    let responseErrors = [];
    responseErrors.push(error.message);
    return showErrors(responseErrors);
  }

  function handler(e) {
    const errors = [];
    const form = e.target;
    console.log(form.elements);
    const { email, password, password_confirm } = form.elements;

    if (email.value.indexOf('@') === -1) {
      errors.push('Email is invalid');
    }

    if (!password.value.length) {
      errors.push('Please enter password');
    } else if (password.value !== password_confirm.value) {
      errors.push('Password is incorrect');
    }

    if (errors.length) {
      return showErrors(errors);
    } 

    hideErrors();
    setLoadingState();
    auth
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(onUserCreated)
      .catch(onUserCreationError);

    e.preventDefault();
  }

  signupForm.addEventListener('submit', handler);
}
