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
    var linhaNum = 10;
    var bombNum = (colNum * linhaNum)/10;
    var flagCont = bombNum;
    var celulas = 1;

    for(var i=0; i<colNum; i++){
        $('#matriz').append("<div class='linhas' id='linha"+i+"'>")
        for(var j=0; j<linhaNum; j++){
            $('#linha'+i).append('<div id="'+celulas+'" class="slot celula_'+(celulas)+'"></div>');
            celulas++;
        }
          $('#matriz').append("</div>")
    }

    //chamando as funções em ordem
    CriarBombas();
    AdaptaBordas()


    function CriarBombas(){
        for(var i=0;i<colNum;i++){
            var bombaPos = (Math.floor(Math.random()*(colNum*linhaNum)));
            console.log(bombaPos);
            $('.celula_'+bombaPos).addClass('bomba');
        }
    }

    function AdaptaBordas(){
        
        //bordas do cimao
        for(var t=1; t<colNum+1; t++){
            $('.celula_'+t).addClass('borda cima-borda')
        }
        
        //bordas da direita
        for(var r=1; r<colNum+1; r++){
            var num = (r*10);
            $('.celula_'+num).addClass('borda direita-borda');
        }
        
        //bordas daesquerda
        for(var l=0; l<colNum; l++){
            var num = parseInt(l*10) + 1;
            $('.celula_'+num).addClass('borda esquerda-borda');
        }
        
        //bordas de baixo
        for(var b=celulas; b>(celulas-10); b--){
            var num = (b-1);
            $('.celula_'+num).addClass('borda fundo-borda');
        }

        //encontrando as quinas do tabuleiro
        $('.Celula').each(function(){
            
            if($(this).hasClass('cima-borda') && $(this).hasClass('esquerda-borda')){
              $(this).removeClass('cima-borda esquerda-borda').addClass('cima-esquerda-quina');
            }else if($(this).hasClass('cima-borda') && $(this).hasClass('direita-borda')){
              $(this).removeClass('cima-borda direita-borda').addClass('cima-direita-quina');
            }else if($(this).hasClass('direita-borda') && $(this).hasClass('fundo-borda')){
              $(this).removeClass('direita-borda fundo-borda').addClass('fundo-direita-quina');
            }else if($(this).hasClass('esquerda-borda') && $(this).hasClass('fundo-borda')){
              $(this).removeClass('esquerda-borda fundo-borda').addClass('fundo-esquerda-quina');
            }
          });
    }

    function EncontrarCelulasVizinhas(){
      //devido ao fatos de que o campo minado 
      //orecisa verificar se uma celula possui alguma 
      //bomba emalguma de sua 8 celulas vizinhas
      //nos cantos ele só poderá verificar 5 delas
      //e nas quinas apenas 3 

      var celulasVerificaveis = [],

      posCelulaClicada = parseInt($(this).attr('id')),
      colNum = parseInt(colNum);

      //verifica se na celula clicada não é uma bomba, senão jogo acaba
        if(!$(this).hasClass('bomba')){
            //topo esquerdo, apenas 3 celulas verificaveis
            if($(this).hasClass('cima-esquerda-quina')){
            celulasVerificaveis.push(
                posCelulaClicada+1,
                posCelulaClicada+colNum,
                posCelulaClicada+colNum+1
            );
            //topo direito, apenas 3 celulas verificaveis
            }else if($(this).hasClass('cima-direita-quina')){
            celulasVerificaveis.push(
                posCelulaClicada-1, 
                posCelulaClicada+colNum,
                posCelulaClicada+colNum-1
            );
            //fundo direito, apenas 3 celulas verificaveis
            }else if($(this).hasClass('fundo-direita-quina')){
            celulasVerificaveis.push(
                posCelulaClicada-1, 
                posCelulaClicada-colNum,
                posCelulaClicada-colNum-1
            );
            //fundo esquerdo, apenas 3 celulas verificaveis
            }else if($(this).hasClass('fundo-esquerda-quina')){
            celulasVerificaveis.push(
                posCelulaClicada+1, 
                posCelulaClicada-colNum,
                posCelulaClicada-colNum+1
            );
            //linha da borda de cima, 5 celulas verificaveis
            }else if($(this).hasClass('cima-borda')){
            var fundoCelula = posCelulaClicada+colNum;
            celulasVerificaveis.push(
                posCelulaClicada-1,
                posCelulaClicada+1,
                fundoCelula, 
                fundoCelula-1,
                fundoCelula+1
            );
            }else if($(this).hasClass('direita-borda')){
            var esquerdaCelula = posCelulaClicada-1;
            celulasVerificaveis.push(
                posCelulaClicada+colNum,
                posCelulaClicada-colNum,
                esquerdaCelula, 
                esquerdaCelula+colNum, 
                esquerdaCelula-colNum
            );
            }else if($(this).hasClass('esquerda-borda')){
            var direitaCelula = posCelulaClicada + 1;
            celulasVerificaveis.push(
                posCelulaClicada+colNum,
                posCelulaClicada-colNum,
                direitaCelula,
                direitaCelula+colNum,
                direitaCelula-colNum
            );
            }else if($(this).hasClass('fundo-borda')){
            var cimaCelula = posCelulaClicada - colNum;
            celulasVerificaveis.push(
                posCelulaClicada+1,
                posCelulaClicada-1,
                cimaCelula,
                cimaCelula+1,
                cimaCelula-1
            );
            }else {
            var direitaCelula = posCelulaClicada+1,
                esquerdaCelula = posCelulaClicada-1,
                fundoCelula = posCelulaClicada+colNum,
                cimaCelula = posCelulaClicada-colNum;
            celulasVerificaveis.push(
                direitaCelula,
                esquerdaCelula,
                fundoCelula,
                cimaCelula,
                fundoCelula-1,
                fundoCelula+1,
                cimaCelula-1,
                cimaCelula+1
            );
            }
        }else{
            return false;
        }
        return celulasVerificaveis;

    }

}
);