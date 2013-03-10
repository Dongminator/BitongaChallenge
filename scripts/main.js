var googleMap;
var googleMapDiv;
var moreInfoDiv;
var moreInfoButton;
var addMeButton;

var sortedDataObjects = new Array(); // Sorted by timestamp

var _backgroundImageWidth = 2560;
var _backgroundImageHeight = 1600;
var _backgroundImageUrl = 'resource/background.jpg';

$(document).ready(function() {
	// Position the background image.
	positionBGImage();
	
	// Load and display google map.
	googleMapDiv = $('<div>').attr('id', 'googleMap');
//	$('#content').append(googleMapDiv);
	googleMapDiv.insertBefore('#moreInfo');
	initialize();
	
	setTimeout(function(){
		loadJSON()
	},1000);
	
	// Create ADD ME button
	addMeButton = $('<button>');
	addMeButton.button({
		label: "ADD ME"
	}).click(function( event ) {
		
    });
	$('#buttons').append(addMeButton);
	
	// Create buttons using jQuery UI.
	moreInfoButton = $('<button>');
	
	moreInfoButton.button({
		label: "MORE INFO"
	}).click(function( event ) {
		
//		$(this).text() === 'MORE INFO' ? $( this ).button({ label: "GO BACK" }) : $( this ).button({ label: "MORE INFO" })
		if ($(this).text() === 'MORE INFO' ) {
			$('#googleMap').css('visibility', 'hidden');
//			flipMapAndInfo (true);
			$( this ).button({ label: "GO BACK" });
		} else {
			$('#googleMap').css('visibility', 'visible');
//			flipMapAndInfo (false);
			$( this ).button({ label: "MORE INFO" })
		}
    });
	$('#buttons').append(moreInfoButton);
	
	moreInfoDivInit();

});

function initialize() {
	var mapOptions = {
			center: new google.maps.LatLng(0, 0),
			zoom: 1,
			mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	googleMap = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
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

function moreInfoDivInit () {
//	moreInfoDiv = $('<div>').attr('id', 'moreInfo');
//	var divLeft = $('<div>').text();
//	
//	$('#content').append(moreInfoDiv);
}

function loadJSON () {
	var xmlhttp;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	} 
	xmlhttp.onreadystatechange= function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			var responseArray = jQuery.parseJSON( xmlhttp.responseText )['entries'];
			
			for (var i = 0; i < responseArray.length; i++) {
				var currObj = responseArray[i];
				insertToSortedArray (currObj);
			}
			sortedDataObjects.sort();
			displayInfo (0, sortedDataObjects) ;
		}
	}
	xmlhttp.open("GET","resource/data.json",true);
	xmlhttp.send();
}

function insertToSortedArray (obj) {
	var timestamp = obj['timestamp'];
	sortedDataObjects.push([timestamp, obj]);
}



function displayInfo (index, sortedArray) {
	if (index < sortedArray.length) {
		var entry = sortedArray[index][1];

		userName = entry['user_name'];
		userPhotoUrl = entry['user_photo'];
		lat = entry['latitude'];
		lon = entry['longitude'];
		locationName = entry['loc_name'];
		caption = entry['caption'];
		timestamp = entry['timestamp'];
		
		displayMarker (userName, userPhotoUrl, lat, lon, locationName, caption, timestamp) ;
		
		setTimeout(function(){
			index++;
			displayInfo (index, sortedArray);
		},100);
	}
}

function displayMarker (userName, userPhotoUrl, lat, lon, locationName, caption, timestamp) {
	var latLon = new google.maps.LatLng(lat, lon);
	var marker = new google.maps.Marker({
		position: latLon,
		map: googleMap,
		animation: google.maps.Animation.DROP,
		title: caption
	});
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