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

    CriarBombas();

    function CriarBombas(){
        var vetorX = new Array();
        var vetorY = new Array();
        var coordenada = new Array();
        let i,j;

        //* CRIANDO AS COORDENADAS PARA AS BOMBAS
        for(i=0;i<=colNum;i++){
            var posX = parseInt(Math.random()*colNum);
            var posY = parseInt(Math.random()*rowNum);
            coordenada.push(posX);
            coordenada.push(posY)
            $('#'+posX+'-'+posY).addClass('bomba')

            //* VERIFICANDO SE A COORDENADA JÁ FOI SELECIONADA, PARA QUE NÃO SE REPITA
            let naoRepete = VerificaTodos(bombPositions, coordenada)

            if(naoRepete){ //* CASO NÃO SE REPITA
                bombPositions.push(coordenada) //* INSIRA A COORDENADA NO ARRAY DE COORDENADAS          
                coordenada = new Array(); //* E LIMPE O VETOR COORDENADA
            }
            else{
                coordenada = new Array(); //* CASO CONTRÁRIO, APENAS LIMPE A COORDENADA
            }
        }
        console.log({bombPositions})
        VerificaSeTemDezBombas(bombPositions) //* SE, DURANTE A CRIAÇÃO DE COORDENADAS, FOR CRIADA UMA QUE SE REPETE, OUTRA SERÁ CRIADA E O ARRAY DE BOMBAS TERÁ MENOS DE 10 BOMBAS, ENTÃO É VERIFICADO SE FOI POSSÍVEL CRIAR 10 COORDENADAS 

        function VerificaSeTemDezBombas(bombPositions){ //* 
            if(bombPositions.length == 10){
                return true
            }
            else{ //* CASO NÃO TENHA SIDO POSSÍVEL
                let quantFaltaPara10 = 10 - bombPositions.length //* É CALCULADO QUANTAS AINDA FALTAM PARA COMPLETAR 10 BOMBAS

                for(i=0;i<=quantFaltaPara10;i++){ //* E ESSE NÚMERO RESTANTE DE BOMBAS É CRIADA
                    var posX = parseInt(Math.random()*colNum);
                    var posY = parseInt(Math.random()*rowNum);
                    coordenada.push(posX);
                    coordenada.push(posY)
                    $('#'+posX+'-'+posY).addClass('bomba')
        
                    let verifica = VerificaTodos(bombPositions, coordenada) //* EVITANDO, OBVIAMENTE, QUE HAJA REPETIÇÃO DE NOVAS COORDENADAS
        
                    if(verifica){ //* E INSERINDO O QUE NÃO ESTÁ REPETIDO
                        bombPositions.push(coordenada)            
                        coordenada = new Array();
                    }
                }
            }
        }

        function VerificaTodos(bombPositions, coordenada){ //* VERIFICANDO SE A COORDENADA JÁ FOI SELECIONADA, PARA QUE NÃO SE REPITA
            let igual = 0
            for(i=0;i<bombPositions.length;i++){
                if(JSON.stringify(coordenada)==JSON.stringify(bombPositions[i])){ //*CASO UMA COORDENADA SEJA IGUAL OUTRA JÁ INSERIDA
                    igual++; //* É GUARDADO O NÚMERO DE REPETIÇÕES QUE ESSA COORDENADA TEM
                }
            }

            if(igual > 0){ //* CASO TENHA MAIS DE ZERO REPETIÇÕES, 
                return false //* É RETORNADO FALSO
            }

            return true //* CASO CONTRÁRIO, É RETORNADO VERDADEIRO E ESSA É UMA NOVA COORDENADA A SER INSERIDA
        }
    }

}
);