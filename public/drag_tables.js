var $page = $(".page");
var $create = $("#create");
var $info = $("#info");
var $size = $("#size");
var $change_size = $(".change_size");
var $submit_size = $("#submit_size");
var $len = $("#len");
var $num = $("#num");
var sizeOn = false;


var $target;
var selected;
var index = 1;
var length = 0;
var moving = false;
var creating = false;

var tableCreating = false;
var posx, posy;
var offsetX = $page.offset().left;
var offsetY = $page.offset().top;

var offX, offY;

$create.on("click", function(event){
	
	$("#nav").after("<div class='shelf' id="+index+">shelf</div>");
	
	if(length > 0){
	
		$target.css({'color': 'black'});
	
	}
	
	$target = $("#"+index);
		
	$target.css({'color': 'red'});
	selected = true;
	
	posx = event.pageX;
	posy = event.pageY;
	
	$target.css({"top": posy-offsetY, "left": posx-offsetX});
	
	offX = posx - ($target.position().left + offsetX);
	offY = posy - ($target.position().top + offsetY); 
	
	$target.on("mousedown", function(event){

		$target.css({'color': 'black'});

		$target = $(this);
		
		$target.css({'color': 'red'});
		selected = true;
		
		moving = true;
				
		posx = event.pageX;
		posy = event.pageY;
		
		offX = posx - ($target.position().left + offsetX);
		offY = posy - ($target.position().top + offsetY); 
		
		event.stopPropagation();

	});
	
	creating = true;
	
	event.stopPropagation();
	

});

$page.mousemove(function(event){

	if(moving == true || creating == true){
	
		posx = event.pageX;
		posy = event.pageY;
	
		$target.css({"top": posy-offsetY-offY, "left": posx-offsetX-offX});
		
	}
	
});

$page.on("mouseup", function(){

	if(creating){
	
		index++;
		length++;
		creating = false;
		moving = false;
	
	}
	
	if(moving){
	
		moving = false;
	
	}
	
});

$info.on("mousedown", function(){

	window.alert(index);

});

$(window).on("mousedown", function(){

	$target.css({"color": "black"});
	selected = false;

});

$size.on("click", function(){

	$change_size.css({"display": "block"});

});

$submit_size.on("mousedown", function(event){

	event.stopPropagation();

	if()
	if(selected){
	
		var length = $len.val();
		
		length = length / 10 + "%";
		
		$target.css({"height": length});
	}else{
	
		
		window.alert("no shelf selected. Click shelf to select one.");
	
	}
});

$change_size.on("mousedown", function(event){

	event.stopPropagation();

});