(() => {

  //=require 'routes/*.js'
  // firebase initialization
  const firebaseConfig = {
    apiKey: 'AIzaSyA4YEDMVV9HD6YyopGVMwl9B50IRMH-HB8',
    authDomain: 'instaprjct-1b433.firebaseapp.com',
    databaseURL: 'https://instaprjct-1b433.firebaseio.com',
    storageBucket: 'instaprjct-1b433.appspot.com',
    messagingSenderId: '1027774856076'
  };
  firebase.initializeApp(firebaseConfig);

  const rootElement = document.getElementById('root');

  //routing
  page('/', main);
  page('/login', login);
  page('/signup', signup);
  page();


  function render(tplName, ctx = {} ) {
    rootElement.innerHTML = templates[tplName](ctx);
  }

})();

