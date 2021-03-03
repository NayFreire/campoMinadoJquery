// $(document).ready(function(){
//     //Click normal
//     $('.slot').click(function(){
//         alert('clicado')
//     })

//     //Click para a bandeira
//     $('.slot').contextmenu(function(){
//         alert('bandeira')
//     })
// })

$(document).ready(function(){
    
    var colNum = 10;
    var rowNum = 10;
    var bombNum = (colNum * rowNum)/10;
    var flagCounter = bombNum;
    var counter = 1;
    var bombPositions = new Array();

    for(var i=0; i<colNum; i++){
        $('#matriz').append("<div class='linhas' id='linha"+i+"'>")
        for(var j=0; j<rowNum; j++){
            $('#linha'+i).append('<div id="'+counter+'" class="slot tile_'+(j)+'"></div>');
            counter++;
        }
        
        $('#matriz').append("</div>")
    }


    CriarBombas();

    function CriarBombas(){
        var vetorX = new Array();
        var vetorY = new Array();
        var coordenada = new Array();
        let i,j;
        // for(i=0;i<=colNum;i++){
        //     var posX = parseInt(Math.random()*colNum);
        //     vetorX.push(posX);

        // }
        // for(j=0;j<=rowNum;j++){
        //     var posY = parseInt(Math.random()*rowNum);
        //     vetorY.push(posY);
        // }
        // bombPositions.push(vetorX,vetorY);
        // console.log({bombPositions})

        for(i=0;i<=colNum;i++){
            var posX = parseInt(Math.random()*colNum);
            var posY = parseInt(Math.random()*rowNum);
            coordenada.push(posX);
            coordenada.push(posY)

            bombPositions.push(coordenada)            
            coordenada = new Array();
        }
        console.log({bombPositions})
    }


    

    // let i
    // for(i=0;i<81;i++){
        
    // }

}
);