'use strict';

(function() {

  firebase.initializeApp({
    apiKey: 'AIzaSyA4YEDMVV9HD6YyopGVMwl9B50IRMH-HB8',
    authDomain: 'instaprjct-1b433.firebaseapp.com',
    databaseURL: 'https://instaprjct-1b433.firebaseio.com',
    storageBucket: 'instaprjct-1b433.appspot.com',
    messagingSenderId: '1027774856076'
  });

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
  page('*', render404);

  render('preloader');

  // simulate firebase 'onready' behavior
  const unsubsribe = firebase.auth().onAuthStateChanged(() => {
    page();
    unsubsribe();
  });

} ());

