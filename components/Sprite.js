export function Sprite(canvas, imgX, imgY, imgLargura, imgAltura){
    const img = new Image();
    img.src = "imagens/folha.png"
    
    const nsb=14; // número de sprites do bloco
    const widthCanvas=canvas.width, heightCanvas=canvas.height;
    var ctx = canvas.getContext('2d'),
        x=imgX, y=imgY, largura=imgLargura, altura=imgAltura,
        playerFrame=0;

    return {
        desenha: (xCanvas, yCanvas) => {
            var largToCanvas = largura * widthCanvas / 600,
                altToCanvas = altura * heightCanvas / 600;
            ctx.drawImage(img, x, y, largura, altura, xCanvas, yCanvas, largToCanvas, altToCanvas);
        },

        desenhaSpriteBloco: function (frame, xCanvas, yCanvas, dimenBloco) {
            // quadro do bloco que ele vai pegar na imagem
            var quadro = x + ( largura * playerFrame )
            ctx.drawImage(img, quadro, y, largura, altura, xCanvas, yCanvas, dimenBloco, dimenBloco)
            if (frame % 4 === 0) {
                playerFrame = (playerFrame + 1) % nsb;
            }
        }

    }

}