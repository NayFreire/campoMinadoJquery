// $(document).ready(function(){
//     //Click normal
//      $('.slot').click(function(){
//         alert('clicado')
//      })

//     //Click para a bandeira
//      $('.slot').contextmenu(function(){
//         alert('bandeira')
//      })

//      //Clica para mostrar o id do slot
//      $('.slot').click(function(){
//         $(this).append(this.id)
//      })
// })

$(document).ready(function(){
    
    var colNum = 9;
    var rowNum = 9;
    var bombNum = (colNum * rowNum)/10;
    var flagCounter = bombNum;
    var counter = 1;
    var bombPositions = new Array();

    // for(var i=0; i<colNum; i++){
    //     $('#matriz').append("<div class='linhas' >")
    //     for(var j=0; j<rowNum; j++){
    //         $('.linhas').append('<div id="'+counter+'" class="slot tile_'+counter+'"></div>');
    //         counter++;
    //     }
    //     j=0;
    //     $('#matriz').append("</div>")
    // }

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
            $('#'+posX+'-'+posY).addClass('bomba')

            let naoRepete = VerificaTodos(bombPositions,coordenada)

            if(naoRepete){
                bombPositions.push(coordenada)            
                coordenada = new Array();
            }
            else{
                coordenada = new Array();
            }
        }
        console.log({bombPositions})
        VerificaSeTemDezBombas(bombPositions)

        function VerificaSeTemDezBombas(bombPositions){
            if(bombPositions.length == 10){
                return true
            }
            else{
                let quantFaltaPara10 = 10 - bombPositions.length

                for(i=0;i<=quantFaltaPara10;i++){
                    var posX = parseInt(Math.random()*colNum);
                    var posY = parseInt(Math.random()*rowNum);
                    coordenada.push(posX);
                    coordenada.push(posY)
                    $('#'+posX+'-'+posY).addClass('bomba')
        
                    let verifica = VerificaTodos(bombPositions, coordenada)
        
                    if(verifica){
                        bombPositions.push(coordenada)            
                        coordenada = new Array();
                    }
                }
            }
        }

        function VerificaSeRepete(coordenada){
            var count = bombPositions.length

            if(JSON.stringify(coordenada)==JSON.stringify(bombPositions[count-1])){
                // coordenada = new Array()
                return false
            }

            return true
        }

        function VerificaTodos(bombPositions, coordenada){
            let igual = 0
            for(i=0;i<bombPositions.length;i++){
                if(JSON.stringify(coordenada)==JSON.stringify(bombPositions[i])){
                    igual++;
                }
            }

            if(igual > 0){
                return false
            }

            return true
        }
    }

}
);