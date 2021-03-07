var colNum = 10,
    rowNum = 10,
    bombNum = (colNum * rowNum)/10,
    flagCounter = 0,
    counter = 1;

for(var i=0; i<colNum; i++){
  for(var j=0; j<rowNum; j++){
    $('.game').append('<div id="'+counter+'" class="tile tile_'+counter+'"></div>');
    counter++;
  }
}

$('head').append('<style>\
  .tile:nth-of-type('+colNum+'n+1){clear: both} \
  .game{width: '+colNum*20+'px; margin: auto;} \
</style>');


for(var t=1; t<colNum+1; t++){
  $('.tile_'+t).addClass('border top-border')
}

for(var r=1; r<colNum+1; r++){
  var num = (r*10);
  $('.tile_'+num).addClass('border right-border');
}

for(var l=0; l<colNum; l++){
  var num = parseInt(l*10) + 1;
  $('.tile_'+num).addClass('border left-border');
}

for(var b=counter; b>(counter-10); b--){
  var num = (b-1);
  $('.tile_'+num).addClass('border bottom-border');
}

$('.tile').each(function(){
  var $this = $(this);
  if($this.hasClass('top-border') && $this.hasClass('left-border')){
    $this.removeClass('top-border left-border').addClass('top-left-corner');
  }else if($this.hasClass('top-border') && $this.hasClass('right-border')){
    $this.removeClass('top-border right-border').addClass('top-right-corner');
  }else if($this.hasClass('right-border') && $this.hasClass('bottom-border')){
    $this.removeClass('right-border bottom-border').addClass('bottom-right-corner');
  }else if($this.hasClass('left-border') && $this.hasClass('bottom-border')){
    $this.removeClass('left-border bottom-border').addClass('bottom-left-corner');
  }
});

function randomInt(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

for(var bomb=0; bomb<bombNum; bomb++){
  var bombTile = randomInt(1,100);
  $('.tile_'+bombTile).addClass('bomb').attr('data-warning','bomb').html('');
}

$.fn.findTargetTiles = function(){
  var $this = $(this),
      targetTiles = [],
      ref = parseInt($this.attr('id')),
      col = parseInt(colNum);
  if(!$this.hasClass('bomb')){
    if($this.hasClass('top-left-corner')){
      targetTiles.push(
        ref+1,
        ref+col,
        ref+col+1
      );
    }else if($this.hasClass('top-right-corner')){
      targetTiles.push(
        ref-1, 
        ref+col,
        ref+col-1
      );
    }else if($this.hasClass('bottom-right-corner')){
      targetTiles.push(
        ref-1, 
        ref-col,
        ref-col-1
      );
    }else if($this.hasClass('bottom-left-corner')){
      targetTiles.push(
        ref+1, 
        ref-colNum,
        ref-colNum+1
      );
    }else if($this.hasClass('top-border')){
      var bottomTile = ref+col;
      targetTiles.push(
        ref-1,
        ref+1,
        bottomTile, 
        bottomTile-1,
        bottomTile+1
      );
    }else if($this.hasClass('right-border')){
      var leftTile = ref-1;
      targetTiles.push(
        ref+col,
        ref-col,
        leftTile, 
        leftTile+col, 
        leftTile-col
      );
    }else if($this.hasClass('left-border')){
      var rightTile = ref + 1;
      targetTiles.push(
        ref+col,
        ref-col,
        rightTile,
        rightTile+col,
        rightTile-col
      );
    }else if($this.hasClass('bottom-border')){
      var topTile = ref - col;
      targetTiles.push(
        ref+1,
        ref-1,
        topTile,
        topTile+1,
        topTile-1
      );
    }else {
      var rightTile = ref+1,
          leftTile = ref-1,
          bottomTile = ref+col,
          topTile = ref-col;
      targetTiles.push(
        rightTile,
        leftTile,
        bottomTile,
        topTile,
        bottomTile-1,
        bottomTile+1,
        topTile-1,
        topTile+1
      );
    }
  }else{
    return false;
  }
  return targetTiles;
};

$.fn.warningVal = function(){
  var $this = $(this),
      bombCounter = 0;
  var targetTiles = $this.findTargetTiles();
  if(!$this.hasClass('bomb')){
    for(var c=0; c<targetTiles.length; c++){
      if($('.tile_'+targetTiles[c]).hasClass('bomb')){
        bombCounter++;
      }
    }
    $this.attr('data-warning', bombCounter);
  }
};

$('.tile').each(function(){
  $(this).warningVal();
});

$.fn.revealTile = function(){
  var $this = $(this),
      val = $this.attr('data-warning');
  
  if($('.game').hasClass('blasted')){
    return false;
  }
  
  if(!$this.hasClass('active')){
    $this.addClass('active');
    if(val == 6 || val == 5 || val == 4 || val == 3){
      $this.html(val).css('color', 'red');
    }else if(val == 2){
      $this.html(val).css('color', 'green');
    }else if(val == 1){
      $this.html(val).css('color', 'black'); 
    }else if(val == 0){
      var neightbours = $this.findTargetTiles();
      for(var c=0; c<neightbours.length; c++){
        $('.tile_'+neightbours[c]).revealTile();
      }
    }else {
      $('.bomb').addClass('activated');
      $this.addClass('blasted');
      $('.game').addClass('blasted');
    }
  }else {
    return false;
  }
  
}

$('.tile').mousedown(function(event){
  switch (event.which) {
    case 1:
      //console.log('Left Mouse');
      if($(this).hasClass('flagged')){
        flagCounter--;
        $('.flag_counter').html(flagCounter);
        $(this).removeClass('flagged')
      }else {
        $(this).revealTile();
        if($('.tile').not('.active').length == 10){
          if(!$('.game').hasClass('blasted')){
            alert('Congratulations')
          }
        }
      }
      break;
    case 2:
      //console.log('Middle Mouse');
      break;
    case 3:
      //console.log('Right Mouse');
      if(!$(this).hasClass('active')){
        if($(this).hasClass('flagged')){
          flagCounter--;
          $('.flag_counter').html(flagCounter);
          $(this).removeClass('flagged')
        }else {
          if(flagCounter == bombNum){
            return false;  
          }else {
            $(this).addClass('flagged');
            flagCounter++;
            $('.flag_counter').html(flagCounter); 
          }
        }
      }
      break;
    default:
      //console.log('?!');
  }

  
});