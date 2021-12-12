var aisleIndex = 10;
var index = 1;

function createRow(n, w, x, y, cats, opening){

	$nav.after("<div id='"+aisleIndex+"' class='aisle'>");
	
	var $grid = $("#"+aisleIndex);
	
	var width = w;
	
	$grid.css({
	
			"width": width+"%",
			"top": y+"%",
			"left": x+"%"
				
	});
	
	$grid.prepend("<p style='position: absolute; left: 50%; top: -150%;'>Aisle "+aisleIndex+"</p>");
	
	var spanWidth = ($grid.width() / n) - 2;

	for(var i = 0; i < n; i++){
			
		$grid.append("<div class='span' id="+index+" style='width: "+spanWidth+"px;'>"+index+"</div>");
		
		$("#"+index+".span").on("mouseover", function(){

			$(".displayInfo").css({
						
				"display": "block",
				"top": event.pageY,
				"left": event.pageX
						
			});
		
			//$("#secNumber").text( cats[$(this).attr("id")][1] );
			//$("#aisleNumber").text( cats[$(this).attr("id")][0] );
			//$("#items").text( cats[$(this).attr("id")][2] );
			
			var aisle = $( this ).parent().attr('id');
			var sec = $(this).attr("id");
			
			$("#secNumber").text( sec );
			$("#aisleNumber").text( aisle );
			
			if(opening){
				$("#items").text( cats[aisle][sec] );
			}

		});
	
		$(".span").on("mouseout", function(){

			$(".displayInfo").css({"display": "none"});

		});
			
		index++;
	 
	}
	index = 1;
	
	aisleIndex--;

}

function createColumn(n, h, x, y, cats, opening){

	$nav.after("<div id='"+aisleIndex+"' class='aisle'>");
	
	var $grid = $("#"+aisleIndex);
	
	var height = h;
	
	var spanHeight;
	
	$grid.css({
	
			"height": h+"%",
			"width": "2%",
			"top": y+"%",
			"left": x+"%"
				
	});
	
	var spanHeight = ($grid.height() / n) - 2;
	

	for(var i = 0; i < n/2; i++){
	
		$grid.append("<div class='block' id="+index+" style='height: "+spanHeight+"px; width: 100%;'>"+index+"</div>");
		
		index++;
	
	}
	
	$nav.after("<div id='"+aisleIndex+"' class='aisle'>");
	
	var $grid = $("#"+aisleIndex);
	
	$grid.css({
	
			"height": h+"%",
			"width": "2%",
			"top": y+"%",
			"left": x+4+"%"
				
	});
	
	var spanHeight = ($grid.height() / n) - 2;
	

	for(var i = 0; i < n/2; i++){
	
		$grid.prepend("<div class='block' id="+index+" style='height: "+spanHeight+"px; width: 100%;'>"+index+"</div>");
		
		index++;
	
	}
	
	$(".block").on("mouseover", function(){

		$(".displayInfo").css({
						
			"display": "block",
			"top": event.pageY,
			"left": event.pageX
						
		});
		
		$("#secNumber").text($(this).attr('id'));
		$("#aisleNumber").text( $( this ).parent().attr('id'));
		
		var id = localStorage.getItem( "storeID" );
		var aisle = $( this ).parent().attr('id');
		var sec = $(this).attr("id");
			
		$("#secNumber").text( sec );
		$("#aisleNumber").text( aisle );
		
		if(opening){
			$("#items").text( cats[aisle][sec] );
		}
		
	});
	
	$(".block").on("mouseout", function(){

		$(".displayInfo").css({"display": "none"});

	});
	
	var down;
	
	if(n%2 ==1)
	{
		down = spanHeight * ( (n+1)/2 );
		
	}else{
		
		down = spanHeight * (n/2);
		
	}
	
	$grid.prepend("<p style='position: absolute; top: "+down+"px; left: -130%;'>aisle "+aisleIndex+"</p>");
	
	aisleIndex--;
	index = 1;
	
}

function createTemp1(numSec, numAisle, cats, opening){

	aisleIndex = numAisle;
	
	var start = 27.5;
	
	createRow(numSec, 45, start, 12);
	
	
	if(numAisle%2 == 1){

		for(var i = 0; i < numAisle/2 - 1; i++){

			createRow( numSec, 20, start, 20 + (i*(80/numAisle)), cats, opening );

		}
	
		for(var i = 0; i < numAisle/2 - 1; i++){

			createRow(numSec, 20, start + 25, 20 + (i*(80/numAisle)), cats, opening );

		}
	
	}else{
		
		for(var i = 0; i < numAisle/2; i++){

			createRow( numSec, 20, start, 20 + (i*(80/numAisle)), cats, opening );

		}
	
		for(var i = 0; i < numAisle/2 - 1; i++){

			createRow(numSec, 20, start + 25, 20 + (i*(80/numAisle)), cats, opening );

		}
		
	}
	
	index = 1;
	aisleIndex = 1;
}

function createTemp2(numSec, numAisle, cats, opening){
	
	aisleIndex = numAisle;
	
	var start = 20;
	
	var width = $nav.width();
	
	start = ( 100 - (numAisle-1)*7.8 ) / 2;

	createRow(numSec, (numAisle-1)*7.8, start, 12, cats, opening); //n, w, x, y

	for(var i = 0; i < numAisle-1; i++){

		createColumn(numSec, 70, start + (i*8), 20, cats, opening); //n, h, x, y

	}
	
	index = 1;
	aisleIndex = 1;

}

function openStore(id)
{
	var numA;
	var numS;
	
	//before executing this code, fill the cats array
	
	
	$.get("/aisle/" + id, function(data, err){
		
		numA = data.length;
		
	});
	
	$.get("/secs/" + id, function(data, err){
		
		numS = data.length;
		
	}).done(function(){
		
		$.get("/cats/" + id, function(data, err){
		
			//create 2 nested for loops
			//inner loop will create the aisles
			//outer loop will add the aisles to the cats array
		
			var index = 0;
			
			var cats = [];
			
			/*
			for(var i = 1; i <= numA; i++)
			{
				var sections = [numS]
				
				for(var j = 1; j <= numS; j++)
				{
					if(index >= data.length){
						
						sections[j] = "empty";
						index++;
						
					}else{
						sections[j] = data[index].category;
						index++;
					}
				
				}
				
				cats[i] = sections;
				
			}
			*/
			
			for(var i = 0; i < data.length; i++)
			{
			
				var sections = [];
				cats[i] = sections;
				
			}
			
			for(var i = 0; i < data.length; i++)
			{
			
				cats[data[i].aisle_id][data[i].section_id] = "";
				
			}
			
			for(var i = 0; i < data.length; i++)
			{
			
				cats[data[i].aisle_id][data[i].section_id] += data[i].category + ", ";
				
			}
			//window.alert(cats[0][0] + ", " + cats[0][0]);
		
			//createTemp1( numS, numA, cats, true);
			createTemp2( numS, numA, cats, true);
			
		
		});
		
	});
	
}




