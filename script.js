$(document).ready(function () {
  var colNum = 10;
  var linhaNum = 10;
  var bombNum = colNum;
  var flagCont = bombNum;
  var celulas = 1;

  for (var i = 0; i < colNum; i++) {
    $("#matriz").append("<div class='linhas' id='linha" + i + "'>");
    for (var j = 0; j < linhaNum; j++) {
      $("#linha" + i).append(
        '<div id="' + celulas + '" class="slot celula_' + celulas + '"></div>'
      );
      celulas++;
    }
    $("#matriz").append("</div>");
  }

  //chamando as funções em ordem
  AdaptaBordas();
  CriarBombas();

  //calculando quantas bombas cada celula possui ao redor
  $(".slot").each(function () {
    if (!$(this).hasClass("bomba")) {
      CalculaBombasAoRedor($(this).attr("id"));
    }
  });

  function CriarBombas() {
    for (var i = 0; i < colNum; i++) {
      var bombaPos = Math.floor(Math.random() * (colNum * linhaNum));

      $(".celula_" + bombaPos)
        .addClass("bomba")
        .attr("qtd-bombas-vizinhas", "bomba");
    }
  }

  function AdaptaBordas() {
    //bordas do cimao
    for (var t = 1; t < colNum + 1; t++) {
      $(".celula_" + t).addClass("borda cima-borda");
    }

    //bordas da direita
    for (var r = 1; r < colNum + 1; r++) {
      var num = r * 10;
      $(".celula_" + num).addClass("borda direita-borda");
    }

    //bordas daesquerda
    for (var l = 0; l < colNum; l++) {
      var num = parseInt(l * 10) + 1;
      $(".celula_" + num).addClass("borda esquerda-borda");
    }

    //bordas de baixo
    for (var b = celulas; b > celulas - 10; b--) {
      var num = b - 1;
      $(".celula_" + num).addClass("borda fundo-borda");
    }

    //encontrando as quinas do tabuleiro
    $(".slot").each(function () {
      if (
        $(this).hasClass("cima-borda") &&
        $(this).hasClass("esquerda-borda")
      ) {
        $(this)
          .removeClass("cima-borda esquerda-borda")
          .addClass("cima-esquerda-quina");
      } else if (
        $(this).hasClass("cima-borda") &&
        $(this).hasClass("direita-borda")
      ) {
        $(this)
          .removeClass("cima-borda direita-borda")
          .addClass("cima-direita-quina");
      } else if (
        $(this).hasClass("direita-borda") &&
        $(this).hasClass("fundo-borda")
      ) {
        $(this)
          .removeClass("direita-borda fundo-borda")
          .addClass("fundo-direita-quina");
      } else if (
        $(this).hasClass("esquerda-borda") &&
        $(this).hasClass("fundo-borda")
      ) {
        $(this)
          .removeClass("esquerda-borda fundo-borda")
          .addClass("fundo-esquerda-quina");
      }
    });
  }

  function EncontrarCelulasVizinhas(id) {
    //devido ao fatos de que o campo minado
    //orecisa verificar se uma celula possui alguma
    //bomba emalguma de sua 8 celulas vizinhas
    //nos cantos ele só poderá verificar 5 delas
    //e nas quinas apenas 3

    var celulasVerificaveis = [],
      posCelulaClicada = parseInt(id);
    //verifica se na celula clicado não é uma bomba, senão jogo acaba
    if (!$("#" + id).hasClass("bomba")) {
      //topo esquerdo, apenas 3 celulas verificaveis
      if ($("#" + id).hasClass("cima-esquerda-quina")) {
        celulasVerificaveis.push(
          posCelulaClicada + 1,
          posCelulaClicada + colNum,
          posCelulaClicada + colNum + 1
        );
        //topo direito, apenas 3 celulas verificaveis
      } else if ($("#" + id).hasClass("cima-direita-quina")) {
        celulasVerificaveis.push(
          posCelulaClicada - 1,
          posCelulaClicada + colNum,
          posCelulaClicada + colNum - 1
        );
        //fundo direito, apenas 3 celulas verificaveis
      } else if ($("#" + id).hasClass("fundo-direita-quina")) {
        celulasVerificaveis.push(
          posCelulaClicada - 1,
          posCelulaClicada - colNum,
          posCelulaClicada - colNum - 1
        );
        //fundo esquerdo, apenas 3 celulas verificaveis
      } else if ($("#" + id).hasClass("fundo-esquerda-quina")) {
        celulasVerificaveis.push(
          posCelulaClicada + 1,
          posCelulaClicada - colNum,
          posCelulaClicada - colNum + 1
        );
        //linha da borda de cima, 5 celulas verificaveis
      } else if ($("#" + id).hasClass("cima-borda")) {
        var fundoCelula = posCelulaClicada + colNum;
        celulasVerificaveis.push(
          posCelulaClicada - 1,
          posCelulaClicada + 1,
          fundoCelula,
          fundoCelula - 1,
          fundoCelula + 1
        );
        //linha da borda da direita, 5 celulas verificaveis
      } else if ($("#" + id).hasClass("direita-borda")) {
        var esquerdaCelula = posCelulaClicada - 1;
        celulasVerificaveis.push(
          posCelulaClicada + colNum,
          posCelulaClicada - colNum,
          esquerdaCelula,
          esquerdaCelula + colNum,
          esquerdaCelula - colNum
        );
        //linha da borda da esquerda, 5 celulas verificaveis
      } else if ($("#" + id).hasClass("esquerda-borda")) {
        var direitaCelula = posCelulaClicada + 1;
        celulasVerificaveis.push(
          posCelulaClicada + colNum,
          posCelulaClicada - colNum,
          direitaCelula,
          direitaCelula + colNum,
          direitaCelula - colNum
        );
        //linha da borda do fundo, 5 celulas verificaveis
      } else if ($("#" + id).hasClass("fundo-borda")) {
        var cimaCelula = posCelulaClicada - colNum;
        celulasVerificaveis.push(
          posCelulaClicada + 1,
          posCelulaClicada - 1,
          cimaCelula,
          cimaCelula + 1,
          cimaCelula - 1
        );
        //agr a celula pode ser qualquer uma que não as bordas
      } else {
        var direitaCelula = posCelulaClicada + 1,
          esquerdaCelula = posCelulaClicada - 1,
          fundoCelula = posCelulaClicada + colNum,
          cimaCelula = posCelulaClicada - colNum;
        celulasVerificaveis.push(
          direitaCelula,
          esquerdaCelula,
          fundoCelula,
          cimaCelula,
          fundoCelula - 1,
          fundoCelula + 1,
          cimaCelula - 1,
          cimaCelula + 1
        );
      }
    } else {
      return false;
    }
    return celulasVerificaveis;
  }

  function CalculaBombasAoRedor(id) {
    var contBombas = 0;
    var celulasVerificaveis = EncontrarCelulasVizinhas(id);

    if (!$(this).hasClass("bomba")) {
      for (var i = 0; i < celulasVerificaveis.length; i++) {
        if ($(".celula_" + celulasVerificaveis[i]).hasClass("bomba")) {
          contBombas++;
        }
      }
      $("#" + id).attr("qtd-bombas-vizinhas", contBombas);
    }
  }

  function MostraConteudoCelula(idCelulaClicada) {
    var qtd_bombas = $("#" + idCelulaClicada).attr("qtd-bombas-vizinhas");

    //verifica se a pessoa ainda pode jogar
    if ($(".matriz").hasClass("perdeu")) {
      return false;
    }

    //verifica se a celula já foi clicado
    if (!$("#" + idCelulaClicada).hasClass("clicado")) {
      $("#" + idCelulaClicada).addClass("clicado");

      //verificando quantas bombas a celula possui ao redor
      //para definir a cor do numero
      if (
        qtd_bombas == 6 ||
        qtd_bombas == 5 ||
        qtd_bombas == 4 ||
        qtd_bombas == 3
      ) {
        $("#" + idCelulaClicada)
          .html(qtd_bombas)
          .css("color", "red");
      } else if (qtd_bombas == 2) {
        $("#" + idCelulaClicada)
          .html(qtd_bombas)
          .css("color", "green");
      } else if (qtd_bombas == 1) {
        $("#" + idCelulaClicada)
          .html(qtd_bombas)
          .css("color", "black");
      } else if (qtd_bombas == 0) {
        //se não possui nenhuma bomba vizinha
        //então vasculha cada vizinho dele para verificar se esse
        //não possui bombas, e assim por diante, ate mostrar
        //todas as celulas vazias em volta do click.
        var vizinhos = EncontrarCelulasVizinhas(idCelulaClicada);
        for (var c = 0; c < vizinhos.length; c++) {
          MostraConteudoCelula($(".celula_" + vizinhos[c]).attr("id"));
        }
      } else {
        //se não possui um qtd_bombasor do atributo inteiro
        //na variavel qtd-bombas-vizinhas
        //então é uma bomba
        console.log("estourou");
        $(".bomba").addClass("ativada clicada");
        $("#i" + idCelulaClicada).addClass("perdeu");
        $(".matriz").addClass("perdeu");
        if (!alert("Você perdeu")) {
          window.location.reload();
        }
      }
    } else {
      return false;
    }
  }

  $(".bandeiras").html(flagCont);

  //função para saber oq fazer quando clica numa celula
  $(".slot").on("click", function () {
    console.log($(this).attr("id"));
    //se onde foi clicado possui bandeira,
    //então remove
    if ($(this).hasClass("bandeira")) {
      flagCont++;
      $(".bandeiras").html(flagCont);
      $(this).removeClass("bandeira");
    } else {
      //se não havia bandeira então revela celula
      //   console.log($(this).attr(id));
      MostraConteudoCelula($(this).attr("id"));
      //se restam 10 celulas, estas devem ser bombas
      if ($(".slot").not(".clicado").length == bombNum) {
        if (!$(".matriz").hasClass("perdeu")) {
          alert("Parabéns você venceu!!!");
        }
      }
    }
  });

  //quando é clicado numa celula com botão direito
  $(".slot").contextmenu(function () {
    console.log("direito");
    //verifica se celula ainda não foi clicado
    if (!$(this).hasClass("clicado") && flagCont >= 0) {
      //se a celula já possui bandeira, então remove
      if ($(this).hasClass("bandeira")) {
        flagCont++;
        $(".bandeiras").html(flagCont);
        $(this).removeClass("bandeira");
      } //se a celula ainda não possui bandeira
      else {
        //   if(flagCont == bombNum){
        //     return false;
        //   }//se não é a primeira bandeira
        //   else {
        if (flagCont != 0) {
          $(this).addClass("bandeira");
          flagCont--;
          $(".bandeiras").html(flagCont);
        }
      }
    }

    return false;
  });
});
