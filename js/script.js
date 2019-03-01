document.addEventListener("DOMContentLoaded", function(event) { 
			
	var templateItem = document.getElementById('template-item').innerHTML;
				
	Mustache.parse(templateItem);
	
	var listItems = '';
	
	for(var i = 0; i < placesData.length; i++){
		listItems += Mustache.render(templateItem, placesData[i]);
	}
	 
	document.getElementById("carousel").insertAdjacentHTML('beforeend', listItems);

	var flkty = new Flickity( '.main-carousel', {
		cellAlign: 'left',
		contain: true,
		pageDots: false,
		hash: true
	});
	
	var progressBar = document.querySelector('.progress-bar');
	flkty.on( 'scroll', function( progress ) {
		progress = Math.max( 0, Math.min( 1, progress ) );
		progressBar.style.width = progress * 100 + '%';
	});
		
	var restartBtn = document.querySelector('.reset'); 
	restartBtn.addEventListener('click', function () {
		flkty.select( 0 );
	});
	
	function attachMarkerListener(marker, i) {
		marker.addListener('click', function () {
			flkty.select(i);
		});							
	}
	
	window.initMap = function() {
		var map = new google.maps.Map(
			document.getElementById('map'), {
				zoom: 7, 
				center: placesData[flkty.selectedIndex].coords
			}
		);
		
		flkty.on( 'change', function( index ) {
			smoothPanAndZoom(map, 7, placesData[index].coords);
		});
		
		for (var i = 0; i < placesData.length; i++) {
			var marker = new google.maps.Marker({
				position: placesData[i].coords, 
				map: map	
			});
			attachMarkerListener(marker, i);
		}	
		
		document.getElementById('center-map').addEventListener('click', function(event){
			event.preventDefault();
			map.panTo(placesData[flkty.selectedIndex].coords);
			map.setZoom(10);
		});
		
		document.getElementById('center-smooth').addEventListener('click', function(event){
			event.preventDefault();
			smoothPanAndZoom(map, 7, placesData[flkty.selectedIndex].coords);
		});
	}	

	var smoothPanAndZoom = function(map, zoom, coords) {
		var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
		jumpZoom = Math.min(jumpZoom, zoom -1);
		jumpZoom = Math.max(jumpZoom, 3);

		smoothZoom(map, jumpZoom, function(){
			smoothPan(map, coords, function(){
				smoothZoom(map, zoom); 
			});
		});
	}
	
	var smoothZoom = function(map, zoom, callback) {
		var startingZoom = map.getZoom();
		var steps = Math.abs(startingZoom - zoom);
			if(!steps) {
			if(callback) {
				callback();
			}	
			return;
		}

		var stepChange = - (startingZoom - zoom) / steps;
		var i = 0;
		
		var timer = window.setInterval(function(){	
			if(++i >= steps) {	
				window.clearInterval(timer);	
				if(callback) {	
					callback();
				}
			}
			map.setZoom(Math.round(startingZoom + stepChange * i));
		}, 80);
	};

	var smoothPan = function(map, coords, callback) {
		var mapCenter = map.getCenter();
		coords = new google.maps.LatLng(coords);

		var steps = 12;
		var panStep = {lat: (coords.lat() - mapCenter.lat()) / steps, lng: (coords.lng() - mapCenter.lng()) / steps};

		var i = 0;
		var timer = window.setInterval(function(){
			if(++i >= steps) {
				window.clearInterval(timer);
				if(callback) callback();
			}
			map.panTo({lat: mapCenter.lat() + panStep.lat * i, lng: mapCenter.lng() + panStep.lng * i});
		}, 1000/30);
	}; 
		
}); 
	
  
		