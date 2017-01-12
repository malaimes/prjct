function map(ctx) {
  render('map', ctx);
  if (!ctx.user) {
    return;
  }

  const adress = ctx.params.location;
  const image = 'http://instagramstatic-a.akamaihd.net/h1/bundles/cdbe8f1edb2309a77710a746c05e5a3c.png';
  const geocoder = new google.maps.Geocoder();
  const latlng = new google.maps.LatLng(-34.397, 150.644);
  const mapOptions = {
    zoom: 15,
    center: latlng,
    draggable: false,
    scrollwheel: false,
    panControl: false,
    maxZoom: 15,
    minZoom: 15,
    disableDefaultUI: true
  };
  
  const map = new google.maps.Map(document.getElementById('map'), mapOptions);


  function codeAddress() {
    const addressName = (ctx.pathname.slice(9));
    geocoder.geocode( { 'address': addressName}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          icon: image
        });
      } else {
        console.log('Incorrect location');
      }
    });
  }

  // function initMap() {
  //   geocoder = new google.maps.Geocoder();

  //   var myLatlng = {lat: -25.363, lng: 131.044};

  //   var map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 4,
  //     center: myLatlng
  //   });

  //   var marker = new google.maps.Marker({
  //     position: myLatlng,
  //     map: map,
  //     title: 'Click to zoom'
  //   });

  //   map.addListener('center_changed', function() {
  //     // 3 seconds after the center of the map has changed, pan back to the
  //     // marker.
  //     window.setTimeout(function() {
  //       map.panTo(marker.getPosition());
  //     }, 3000);
  //   });

  //   marker.addListener('click', function() {
  //     map.setZoom(8);
  //     map.setCenter(marker.getPosition());
  //   });
  // }

  //initMap();
  codeAddress();

  const errorMessage = document.createTextNode(`No posts from city "${adress}", SORRY :(`);
  const feed = qs('#feed');
  const cityNamePage = qs('#name');
  const dbRef = firebase.database().ref('posts');
  cityNamePage.innerHTML = adress;
  dbRef
    .orderByChild('location')
    .equalTo(adress)
    .limitToLast(10)
    .once('value', snapshot => {
      const entries = snapshot.val(); 
      if (entries) {
        sortBy(entries, 'created').forEach(entrie => {
          const post = new Post(entrie, { currentUser: ctx.user });
          feed.insertBefore(post.element, feed.firstElementChild);
        });
      } else {
        cityNamePage.innerHTML = errorMessage;
      }
    });
}
