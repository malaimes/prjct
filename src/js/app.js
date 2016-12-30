'use strict';

(function() {


  //=require 'firebase.config.js'

  try {
    firebase.initializeApp(firebaseConfig || {});
  } catch (err) {
    alert(
      `Please, add src/js/firebase.config.js file with the following content:
      "const firebaseConfig = { ... };"`
    );
  }

  //=require 'lib/*.js'
  //=require 'classes/*.js'
  //=require 'middlewares/*.js'
  //=require 'routes/*.js'

  const { location, history, templates } = window;
  const rootElement = qs('#root');

  function render(tplName, data = {}) {
    const user = firebase.auth().currentUser;
    const userData = user ? user.toJSON() : null;
    data = Object.assign(data, { user: userData });
    rootElement.innerHTML = templates[tplName](data);
  }

  function render404() {
    render('404');
  }

  page('*', auth);
  page('/', main);
  page('/login', login);
  page('/logout', logout);
  page('/signup', signup);
  page('/profile', profile);
  page('/profile/edit', profileEdit);
  page('/add', add);
  page('*', render404);

  render('preloader');

  // simulate firebase 'onready' behavior
  const unsubsribe = firebase.auth().onAuthStateChanged(() => {
    page();
    unsubsribe();
  });

} ());
