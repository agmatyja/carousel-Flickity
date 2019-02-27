document.addEventListener("DOMContentLoaded", function(event) { 

	var flkty = new Flickity( '.main-carousel', {
	  // options
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