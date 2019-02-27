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
});
