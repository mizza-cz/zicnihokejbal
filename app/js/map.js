$(document).ready(function () {
   var latlng = new google.maps.LatLng(mapVars.center.lat, mapVars.center.lon);
   var wasFullScreen = false;

   // Creating an object literal containing the properties we want to pass to the map  
   var options = {
       zoom: mapVars.zoom, // This number can be set to define the initial zoom level of the map
       center: latlng,
       scrollwheel: false,
       styles: [{"featureType": "administrative", "elementType": "all", "stylers": [{"saturation": "-100"}]}, {"featureType": "administrative.province", "elementType": "all", "stylers": [{"visibility": "off"}]}, {"featureType": "landscape", "elementType": "all", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "elementType": "all", "stylers": [{"saturation": -100}, {"lightness": "50"}, {"visibility": "simplified"}]}, {"featureType": "road", "elementType": "all", "stylers": [{"saturation": "-100"}]}, {"featureType": "road.highway", "elementType": "all", "stylers": [{"visibility": "simplified"}]}, {"featureType": "road.arterial", "elementType": "all", "stylers": [{"lightness": "30"}]}, {"featureType": "road.local", "elementType": "all", "stylers": [{"lightness": "40"}]}, {"featureType": "transit", "elementType": "all", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"lightness": -25}, {"saturation": -100}]}],
       mapTypeId: google.maps.MapTypeId.ROADMAP, // This value can be set to define the map type ROADMAP/SATELLITE/HYBRID/TERRAIN
   };

   // Calling the constructor, thereby initializing the map  
   var map = new google.maps.Map(document.getElementById('map-canvas'), options);

   // Define Marker properties
   var imageclub = new google.maps.MarkerImage('/images/svg/marker-orange.svg',
           // This marker is 129 pixels wide by 42 pixels tall.
           new google.maps.Size(30, 45),
           // The origin for this image is 0,0.
           new google.maps.Point(0, 0),
           // The anchor for this image is the base of the flagpole at 18,42.
           new google.maps.Point(18, 42)
   );
   var imageschool = new google.maps.MarkerImage('/images/svg/marker-blue.svg',
           // This marker is 129 pixels wide by 42 pixels tall.
           new google.maps.Size(30, 45),
           // The origin for this image is 0,0.
           new google.maps.Point(0, 0),
           // The anchor for this image is the base of the flagpole at 18,42.
           new google.maps.Point(18, 42)
   );
   var imagepreschool = new google.maps.MarkerImage('/images/svg/marker-red.svg',
           // This marker is 129 pixels wide by 42 pixels tall.
           new google.maps.Size(30, 45),
           // The origin for this image is 0,0.
           new google.maps.Point(0, 0),
           // The anchor for this image is the base of the flagpole at 18,42.
           new google.maps.Point(18, 42)
   );

   var windows = [];
   var latlngbounds = new google.maps.LatLngBounds( );
   latlngbounds.extend( latlng );

   for (var i = 0; i < mapVars.markers.length; i++) {
       var icon = imageclub;

       if (mapVars.markers[i].type === 'school') {
           icon = imageschool;
       } else if (mapVars.markers[i].type === 'preschool') {
           icon = imagepreschool;
       }

       var marker = new google.maps.Marker({
           position: new google.maps.LatLng(mapVars.markers[i].lat, mapVars.markers[i].lon),
           map: map,
           icon: icon
       });

       latlngbounds.extend( new google.maps.LatLng(mapVars.markers[i].lat, mapVars.markers[i].lon) );

       addMarker(marker, mapVars.markers[i]);
   }

   if (mapVars.centerMap) {
       map.fitBounds( latlngbounds );
   }

  /* var markerCluster = new MarkerClusterer(
           map,
           addedMarkers,
           {
//			gridSize: 10,
               styles: [
                   {
                       textColor: 'white',
                       url: '/images/marker-group.png',
                       height: 48,
                       width: 48
                   }
               ]
           }
   );*/

//    map.addListener('center_changed', function () {
//        setFullScreen();
//    });

   function addMarker(marker, item) {
       var infowindow = new google.maps.InfoWindow({
           content: '<div class="map-popup"><h4 class="map-popup-title">' + item.name + '</h4>' + item.link + '</div>'
       });

       windows.push(infowindow);

       marker.addListener('click', function () {
           infowindow.open(map, marker);
           closeWindow(infowindow);
       });
   }

   function closeWindow(window) {
       for (var i = 0; i < windows.length; i++) {
           if (window != windows[i]) {
               windows[i].close();
           }
       }
   }

   $('html,body').on('click','[aria-label="Toggle fullscreen view"]', function(e) {
       e.stopPropagation();
       $(this).toggleClass('is-fullscreen');
   });


});