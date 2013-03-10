var googleMap;
var googleMapDiv;

var _backgroundImageWidth = 2560;
var _backgroundImageHeight = 1600;
var _backgroundImageUrl = 'background.jpg';

$(document).ready(function() {
	
	positionBGImage();
	
	googleMapDiv = $('<div>').attr('id', 'googleMap');
	$('#content').append(googleMapDiv);
	
	initialize();
	
});

function initialize() {
	var mapOptions = {
			center: new google.maps.LatLng(0, 0),
			zoom: 1,
			mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var googleMap = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
}

function positionBGImage () {
	var resizedImageWidth, resizedImageHeight, topShift = 0, leftShift = 0;
	var currWindowWidth = $(window).width(); 
	var currWindowHeight = $(window).height(); 
	
	var bgImageWHRatio = _backgroundImageWidth/_backgroundImageHeight; // Width height ratio of the background image.
	var currWindowWHRatio = currWindowWidth/currWindowHeight; // Width height ratio of the current screen.
	
	if ( currWindowWHRatio >= bgImageWHRatio ) {// Shift image to the top
		resizedImageWidth = currWindowWidth;
		resizedImageHeight = resizedImageWidth*_backgroundImageHeight/_backgroundImageWidth;
		topShift = 0 - ((resizedImageHeight - currWindowHeight) / 2);
	} else { // Shift image to the left
		console.log('move left');
		resizedImageHeight = currWindowHeight;
		resizedImageWidth = resizedImageHeight*_backgroundImageWidth/_backgroundImageHeight;
		leftShift = 0 - ((resizedImageWidth - currWindowWidth) / 2);
	}

	$('body').css('background-image', "url('" + _backgroundImageUrl + "')" ); // Load background image
	$('body').css('background-size', resizedImageWidth + "px " + resizedImageHeight + "px"); // resize background image so it fits in the window.
	$('body').css('background-position', leftShift + "px " + topShift + "px"); // Shift background image so the centre of the image is always in the centre of the screen
}

// When window resizes, reposition background image
$(window).resize(function() {
	positionBGImage();
});