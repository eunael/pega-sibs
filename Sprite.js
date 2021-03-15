/**
 * Sprite é um aquela forma de desenhar o mesmo desenho só que em posições diferentes e colar
 * os desenhos em uma tira comprida de papel e colocá-la para rodar numa máquina que faz isso
 * quando a máquina está rodando e a pessoa olha por um determinado ponto, aqueles desenhos na
 * tira de papel, formam um desenho só que fica se mexendo.
 * Agora, vamos replicar isso no Canvas com o JavaScript
 */

 var canvas, ctx

 canvas = document.createElement("canvas");
 canvas.width = 600;
 canvas.height = 600;
 ctx = canvas.getContext("2d"); // é preciso do contexto do canvas para criar os sprites

 function Sprite(x, y, largura, altura) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;

    this.desenha = function(xCanvas, yCanvas){
        ctx.drawImage(img, this.x, this.y, this.largura, this.altura, xCanvas, yCanvas, this.largura, this.altura)
    }
 }
 var bg = new Sprite(0, 0, 600, 600)