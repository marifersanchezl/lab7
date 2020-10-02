$(document).ready(function(){
	
	var temas = ["Happy", "Birthday", "Fenty", "HBD", "One Direction", "Emoji", "AHS", "Ketnipz", "Ratched", "Henry Cavil", "Teus", "Robert Pattinson", "Laptop"];

	for (var i = 0; i < temas.length; i++){
		$('#gif-buttons').append(`<button type='button' class='gif-item' value='${temas[i]}'>${temas[i]}</button>`);
	}

	$('#add-gif').on('click', function(e){
		e.preventDefault();
		
		temas.push($('#gif-input').val());

		$('#gif-buttons').html(''); // para no duplicar contenido

		for (var i = 0; i < temas.length; i++){
			$('#gif-buttons').append(`<button type='button' class='gif-item' value='${temas[i]}'>${temas[i]}</button>`);
		}
	});

	$('#gif-buttons').on('click', '.gif-item', function(e){
		$.ajax({
		  //key = YsSZOsZw53w2hSPelBP3kfuyVQzg5rRP
		  url: `http://api.giphy.com/v1/gifs/search?q=${this.value}&api_key=YsSZOsZw53w2hSPelBP3kfuyVQzg5rRP&limit=10`,

		  success: function(respuesta){
			$('#gifs').html('');
			for (let i = 0; i < respuesta.data.length; i++){
		  
			const image = $('<img>');
			const still = respuesta.data[i].images.fixed_height_still.url;
			const move = respuesta.data[i].images.fixed_height.url;
			const rating = respuesta.data[i].rating;

			image.attr('src', still);
			image.attr('data-move', move);
			image.attr('data-motion', 'n');
			image.attr('data-still', still);
			
			$('#gifs').append(`<div class="gif-style" id="gif-style-${i}"><p>Rating: ${rating}</p></div>`);
			$(`#gif-style-${i}`).append(image);
		}
		  },

		  error: function(e){
			console.log("Ups! There is an error.");
		  },
		});
	  });


	  $('#gifs').on('click', '.gif-style', function() {
		
		if ($(this).find('img').attr('data-motion') === 'y') {
			$(this).find('img').attr('src', $(this).find('img').attr('data-still'));
			$(this).find('img').attr('data-motion', 'n');
		} else {
			$(this).find('img').attr('src', $(this).find('img').attr('data-move'));
			$(this).find('img').attr('data-motion', 'y');
		}
	});
});
