var googleMap;
var googleMapDiv;
var moreInfoButton;

var _backgroundImageWidth = 2560;
var _backgroundImageHeight = 1600;
var _backgroundImageUrl = 'background.jpg';

$(document).ready(function() {
	// Position the background image.
	positionBGImage();
	
	// Load and display google map.
	googleMapDiv = $('<div>').attr('id', 'googleMap');
	$('#content').append(googleMapDiv);
	initialize();
	
	// Create buttons using jQuery UI.
	moreInfoButton = $('<button>').attr('id','c');
	
	
	
	moreInfoButton.button({
		label: "MORE INFO"
	}).click(function( event ) {
		
		
//		$(this).text() === 'MORE INFO' ? $( this ).button({ label: "GO BACK" }) : $( this ).button({ label: "MORE INFO" })
		if ($(this).text() === 'MORE INFO' ) {
			flipMapAndInfo (true);
			$( this ).button({ label: "GO BACK" });
		} else {
			flipMapAndInfo (false);
			$( this ).button({ label: "MORE INFO" })
		}
		
    });
	$('#content').after(moreInfoButton);
	
	
	loadJSON();
	
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


function loadJSON () {
	var xmlhttp;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	} 
	xmlhttp.onreadystatechange= function() {
		console.log(xmlhttp);
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			console.log(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET","data.json",true);
	xmlhttp.send();
}

/**
 * 
 * @param option if true, flip to information. if false, flip to map.
 */
function flipMapAndInfo (option) {
	if (option) {
		$("#content").flip({
			direction:'lr',
			content: "<p>aa</p>"
		});
	} else {
		console.log(googleMapDiv);
		$("#content").flip({
			direction:'lr',
			content: $('<div>').append(googleMapDiv)
		});
	}
	
	
	
}

// When window resizes, reposition background image
$(window).resize(function() {
	positionBGImage();
});