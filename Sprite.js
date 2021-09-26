var canvas, ctx, numSprite, numColuna; // precisamos do contexto do canvas aqui, mas, como não temos, vamos criar um canvas igual ao de verdade apenas para pegar o contexto

canvas = document.createElement('canvas');
canvas.width = 600;
canvas.height = 600;
ctx = canvas.getContext('2d')
numSprite = 14

function Sprite(x, y, largura, altura) {
    // esse atributos são para informar onde
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.playerFrame = 0;

    this.desenha = function (xCanvas, yCanvas) {
        // recebe uma imagem, vai captura uma parta dessa imagem que correspondente à sprite e vai desenha no canvas
        ctx.drawImage(img, this.x, this.y, this.largura, this.altura, xCanvas, yCanvas, this.largura, this.altura)
    }
    this.desenhaSpriteBloco = function (frames, xCanvas, yCanvas) {
        ctx.drawImage(img, this.x+(this.largura*this.playerFrame), this.y, this.largura, this.altura, xCanvas, yCanvas, this.largura, this.altura)
        if (frames % 4 === 0) {
            this.playerFrame = (this.playerFrame + 1) % numSprite;
        }
    }
}

var bg = new Sprite(0, 0, 1000, 1000); // desenhando o background do jogo
var spriteBloco = new Sprite(620, 0, 60, 60)
var comecaJogo = new Sprite(20, 650, 406, 300); // antes de começar o jogo
var perdeuJogo = new Sprite(447, 650, 406, 300); // depois de perder o jogo
var ganhouJogo = new Sprite(874, 650, 406, 300); // depois de ganhar o jogo
