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