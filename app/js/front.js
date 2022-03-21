
$.extend({
	addParamToUrl: function (url, param) {
		if (url.indexOf('?') === -1) {
			url += '?';
		} else {
			url += '&';
		}

		return url + param;
	}
});

$(function () {

	$(document).on('click', 'a.search-link', function (event) {
		event.preventDefault();

		var self = $(this);

		var callback = function (position) {
			window.location.href = $.addParamToUrl(self.attr('href'), 'lt=' + position.coords.latitude + '&lg=' + position.coords.longitude);
		}
		
		var errorCallback = function (error) {
			$('.geo-not-allowed').css('display', 'block');
		}

		navigator.geolocation.getCurrentPosition(callback, errorCallback);

		return false;
	});

});

function bindInfoWindow(marker, map, infoWindow, html) {
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
}     

function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(49.741975,15.335317),
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        maxZoom: 11
    };



    var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

    var i=0;
    var infoWindow = new google.maps.InfoWindow({content: ''});
    var latlngbounds = new google.maps.LatLngBounds( );
    for(i in markers ) {
                var logo = '';
                if(markers[i].logo)
                    logo = '<img src="' + markers[i].logo + '" width="50px"/>';

                var html = '<div class="map-info">'
                    + logo
                    +'<div class="txt"><h2>' + markers[i].name + '</h2>'
                    +'<p><a href="' + markers[i].link + '" target="_blank">' + markers[i].linkname + '</a></p>'
                    +'<p>' + markers[i].street + ', ' + markers[i].city + ', ' + markers[i].zip + '</p>' 
                    +'<p class="text-right"><a href="' + markers[i].detail + '" target="_blank">VĂ­ce o klubu &raquo;</a></p>' 
                    + '</div></div>';

                var marker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(markers[i].lat,markers[i].lng),
                });

                bindInfoWindow(marker,map,infoWindow, html);

            latlngbounds.extend( new google.maps.LatLng(markers[i].lat,markers[i].lng) );

    }

    map.fitBounds( latlngbounds );

}