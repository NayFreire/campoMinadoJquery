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

        VerificaBordas()

        // VerificaCantos()

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

        function VerificaBordas(){
            let slotsBorda = new Array('0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6', '0-7', '0-8',
                                   '1-0', '2-0', '3-0', '4-0', '5-0', '6-0', '7-0', '8-0',
                                   '8-1', '8-2', '8-3', '8-4', '8-5', '8-6', '8-7', '8-8',
                                   '1-8', '2-8', '3-8', '4-8', '5-8', '6-8', '7-8')

            var slots = new Array()
            //slots.push($('.slot').attr('id'))

            $('.slot').each(function(){
                slots.push($(this).attr('id'))
            })

            console.log({slots})

            for(i=0;i<81;i++){
                for(j=0;j<slotsBorda.length;j++){
                    if(slots[i]==slotsBorda[j]){
                        $('#'+slots[i]).addClass('borda')
                    }
                }
            }

            VerificaCantos()

            function VerificaCantos(){
                let slotsCantos = new Array('0-0', '0-8', '8-0', '8-8')
    
                console.log({slotsCantos})

                for(i=0;i<slotsCantos.length;i++){
                    $('#'+slotsCantos[i]).each(function(){
                        $(this).addClass('canto')
                    })
                }
                
            }

            CalculaCantos()

            function CalculaCantos(){
                $('.canto').click(function(){
                    for(i=0;i<slots.length;i++){
                        if($(this).attr('id')==slots[i]){
                            let pos = i
                            if(pos==0){
                                let slotDireita = slots[pos+1]
                                let slotAbaixo = slots[pos+9]
                                let slotDiagonal = slots[pos+10]

                                $('#'+slotDireita).addClass('ladosCantos')
                                $('#'+slotAbaixo).addClass('ladosCantos')
                                $('#'+slotDiagonal).addClass('ladosCantos')
                            }

                            if(pos==8){
                                let slotEsquerda = slots[pos-1]
                                let slotAbaixo = slots[pos+9]
                                let slotDiagonal = slots[pos+8]

                                $('#'+slotEsquerda).addClass('ladosCantos')
                                $('#'+slotAbaixo).addClass('ladosCantos')
                                $('#'+slotDiagonal).addClass('ladosCantos')
                            }

                            if(pos==72){
                                // let slotAcima = 
                            }
                        }
                    }
                })
            }
        }

        
    }

}
);