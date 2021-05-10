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

    this.desenha = function (dimenCanvasX, dimenCanvasY) {
        var dimenSpriteX = dimenCanvasX * this.largura / 600
        var dimenSpriteY = dimenCanvasY * this.altura / 600
        var posiSpriteX = (dimenCanvasX - dimenSpriteX) / 2
        var posiSpriteY = (dimenCanvasY - dimenSpriteY) / 2
        // recebe uma imagem, vai captura uma parta dessa imagem que correspondente à sprite e vai desenha no canvas
        ctx.drawImage(img, this.x, this.y, this.largura, this.altura, posiSpriteX, posiSpriteY, dimenSpriteX, dimenSpriteY)
    }
    this.desenhaSpriteBloco = function (frames, xCanvas, yCanvas, dimenCanvasX, dimenCanvasY) {
        ctx.drawImage(img, this.x+(this.largura*this.playerFrame), this.y, this.largura, this.altura, xCanvas, yCanvas, dimenCanvasX/10, dimenCanvasY/10)
        if (frames % 4 === 0) {
            // console.log(this.largura*this.playerFrame);
            this.playerFrame = (this.playerFrame + 1) % numSprite;
        }
    }
}

var bg = new Sprite(0, 0, 1000, 1000); // desenhando o background do jogo
var spriteBloco = new Sprite(620, 0, 60, 60,)
var comecaJogo = new Sprite(20, 650, 406, 300); // antes de começar o jogo
var perdeuJogo = new Sprite(447, 650, 406, 300); // depois de perder o jogo
var ganhouJogo = new Sprite(874, 650, 406, 300); // depois de ganhar o jogo
