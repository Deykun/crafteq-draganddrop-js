$(document).ready(function(){
	var dragged, covered;

	/* Przepisy łączenia przedmiotów [item1 + item2 → item3] */
	var recipes = [
		['patyk','grot','wlocznia'],
		['patyk','lina','wedka']]

	/* Łączenie przedmiotów w inne */
	function craft(dragged, covered) {
			var crafting = [];
			crafting[0] = false;
			for (var i = 0; i<recipes.length ; i++) {
				if ((dragged === 'png\\'+recipes[i][0]+'.png' && covered === 'png\\'+recipes[i][1]+'.png')
				|| (dragged === 'png\\'+recipes[i][1]+'.png' && covered === 'png\\'+recipes[i][0]+'.png')) {
					crafting[0] = true;
					crafting[1] = 'png\\'+recipes[i][2]+'.png';
				}
			}
		return crafting;
		}

	$( '.box > img' ).draggable({	revert: true, cursor:'grabbing' });

	$( '.box' ).droppable({
		activeClass: "active",
		hoverClass: "activeHover",

		drop: function(even, ui) {

			dragged = ui.draggable.attr('src');

			/* Jeżeli miejsce jest już zajęte przez inny przedmiot */
			if ($(this).find('img').length === 1) {

				covered = $(this).find('img').attr('src');

				/* Próba połączenia przedmiotów */
				var crafted = craft(dragged, covered);
				/* Jeśli udało się połączyć */
				if ( crafted[0] === true ){
					dragged = crafted[1];
					$(this).empty().append('<img src="'+crafted[1]+'">').find('img').draggable({	revert: true });
					ui.draggable.remove();
				}
			} else {
				$(this).empty().append('<img src="'+dragged+'">').find('img').draggable({	revert: true });
				ui.draggable.remove();
			}

			/* Odświeżenie pola dodatkowych informacji */
			var txt;
			if ($('#details > div > img').length === 0) { txt = 'więcej informacji...';
			} else {	txt =	$('#details > div > img').attr('src').replace('.png', '').replace('png\\', ''); }

			$('#details > h3').empty().append(txt);
	  }
	});
});
