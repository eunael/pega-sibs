import { Bloco } from './components/Bloco.js';
import { Silabas } from './components/Silabas.js';
import { Sprite } from './components/Sprite.js';
import { GameState } from './utils/estadoJogo.js';

let
// para configurações do canvas
canvas, ctx, frame=1,
// para configurações das dimensões dos elementos do canvas
plano, padrao,
// elementos do canvas
bloco, spriteBloco, silabas,
// controle dos status do jogo
comecaJogo, perdeuJogo, ganhouJogo, estadoJogo,
// tempo de exibição das bolinhas de vida
tempoMostrvidas = 150;

// monitorar se o usuário está acessando de um dispositivo mobile
function detectar_mobile() { 
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
    }
    else {
        return false;
    }
}

/* setar um tamanho do canvas para cada tamanho de tela*/
function setSizePC(){
    let width = window.innerWidth
    let val;
    if (width < 576){
        val = 300
    } else if (width < 768) {
        val = 360
    } else if (width < 992) {
        val = 420
    } else {
        val = 600
    }

    return val
}

// window.addEventListener('resize',  () => {
//     if(detectar_mobile()){
//         plano = setSizeMobile()
//     } else {
//         plano = setSizePC()
//     }
//     padrao = plano / 10
//     canvas.width = plano
//     canvas.height = plano
//     let blocoAtt = bloco.getAtributos()
//     bloco.atualizaBloco(blocoAtt.quadroX*padrao, blocoAtt.quadroY*padrao, plano, padrao, true)
// })
/** */

// reseta a sílabas, mas valida se resta tudo ou apenas uma parte
function resetJogo(all=false) {
    if(all) {
        bloco.resetaBloco(true)
        silabas.resetaSilabas(true)
    } else {
        bloco.resetaBloco()
        silabas.resetaSilabas()
    }
}

// controi os objetos das sílabas que serão mostradas para o jogador
function constroiSilabasCanvas() {
    // sorteia a nova palavra
    silabas.constroiPalavra()
        
    // sorteia a forma de apresentação das sílabas aleatórias
    let opcaoConstr = Math.floor(Math.random() * 2)
    if(opcaoConstr == 0){
        silabas.constroiSilabas()
    } else {
        silabas.constroiSilabasMix()
    }
}

// a imagem no campo da dica
function setImagem(nome){
    // configurações da imagem de dica
    let img = document.getElementById('img-dica'), dir_img = "../images/dicas/";

    img.setAttribute('src', `${dir_img}${nome}`)
}

// desenhar o círculo que repesentam as vida do catch-catch
function mostraVidas(){
    let numVida = bloco.getAtributos().vidas
    ctx.fillStyle = "#e61515"

    for (let i = 1; i <= numVida; i++) {
        let paramX = 30 * plano / 600
        let paramY = 20 * plano / 600

        let x = plano - (paramX*i)

        ctx.beginPath();
        ctx.arc(x, paramY, 13*padrao/60, 0, 2*Math.PI);
        ctx.fill()
    } 
}

// desenha as linhas para fazer o quadriculado na tela
function linhas(){
    ctx.strokeStyle="#262626"
    ctx.lineWidth = 1
    // vertical
    for(var x=padrao; x<plano; x+=padrao){
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, plano);
        ctx.stroke();
    }
    // horizontal
    for(var y=padrao; y<plano; y+=padrao){
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(plano, y);
        ctx.stroke();
    }
}

// mover o personagem
function mover(tecla) {
    // so se move quando estive "jogando"
    if(estadoJogo.getState() == "jogando"){
        if(tecla==38){
            // setinha para CIMA: 38
            // letra W: tecla==119 || tecla==87
            bloco.atualizaBloco(0, -padrao, plano, padrao)
        } else if(tecla==39){
            // setinha para DIREITA: 39
            // letra D: tecla==100 ||tecla==68
            bloco.atualizaBloco(padrao, 0, plano, padrao)
        } else if(tecla==40){
            // setinha para BAIXO: 40
            // letra S: tecla==115 || tecla==83
            bloco.atualizaBloco(0, padrao, plano, padrao)
        } else if(tecla==37){
            // setinha para ESQUERDA: 37
            // letra A: tecla==97 || tecla==65
            bloco.atualizaBloco(-padrao, 0, plano, padrao)
        }

    }
}

// muda o status do jogo com o click na tela
function mudaStatusJogo(){
    if(estadoJogo.getState() == "jogar"){
        resetJogo(true)

        constroiSilabasCanvas()

        let palavra = silabas.getPalavra()
        
        setImagem(palavra.imagem);
        
        estadoJogo.setState(1)

    } else if (estadoJogo.getState() == "ganhou") {
        setImagem("vamos-la.png");
        estadoJogo.setState(0)

    } else if (estadoJogo.getState() == "perdeu") {
        let numVida = bloco.perderVida()

        if (numVida > 0) {
            resetJogo()
            estadoJogo.setState(1)
        } else {
            setImagem("vamos-la.png");
            estadoJogo.setState(0)
        }

    }
}

function atualiza(){
    if(estadoJogo.getState() == "jogando"){
        frame++;
        let infoBloco = bloco.getAtributos()
        silabas.atualiza(infoBloco.x, infoBloco.y, plano)
        if (tempoMostrvidas > 0) {
            tempoMostrvidas--;
        }
    } else if(estadoJogo.getState() == "jogar"){
        frame = 0
        tempoMostrvidas = 150
    } else {
        frame++
        tempoMostrvidas = 150
    }
}

function desenha(){
    if (estadoJogo.getState() == "jogar") {
        ctx.save();
        ctx.resetTransform();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        ctx.fillStyle = "#014c78"

        ctx.fillRect(0, 0, plano, plano)

        comecaJogo.desenha((406*plano/600)/4, (300*plano/600)/2, plano)

    } else if(estadoJogo.getState() == "jogando"){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#014c78"
        ctx.fillRect(0, 0, plano, plano)
        
        silabas.desenha(padrao, plano)
        
        linhas()

        if(tempoMostrvidas > 0){
            mostraVidas()
        }
        
        bloco.desenhaBloco(frame, padrao, spriteBloco)

    } else if (estadoJogo.getState()  == "ganhou") {
        ganhouJogo.desenha((406*plano/600)/4, (300*plano/600)/2, plano)

        ctx.fillStyle = "#008D1F"
        let tamX = (250)*plano/600, tamY = (70)*plano/600;
        ctx.fillRect((175*plano/600), (475*plano/600), tamX, tamY)

        var sizeFont = 28 * plano / 600
        var frase = `novo jogo`
        ctx.fillStyle = "#ffffff"
        ctx.font = `${sizeFont}px Bouncy-Black`
        ctx.fillText(frase, (223*plano/600), (517*plano/600))

    } else if (estadoJogo.getState()  == "perdeu") {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#014c78"
        ctx.fillRect(0, 0, plano, plano)

        silabas.desenhaSibsPassou(padrao, plano)

        linhas()

        bloco.desenhaBloco(frame, padrao, spriteBloco)

        perdeuJogo.desenha((406*plano/600)/4, (300*plano/600)/2, plano)

        ctx.fillStyle = "#008D1F"
        let tamX = (250)*plano/600, tamY = (70)*plano/600;
        ctx.fillRect((175*plano/600), (475*plano/600), tamX, tamY)

        var sizeFont = 28 * plano / 600
        var numDeVidas = `${bloco.getAtributos().vidas - 1}`
        var frase = [
            `Restam    vida.`,
            `Restam    vida.`,
            `Restam    vidas`,
        ]
        ctx.fillStyle = "#ffffff"
        ctx.font = `${sizeFont}px Bouncy-Black`
        ctx.fillText(frase[numDeVidas], (183*plano/600), (517*plano/600))
        ctx.font = `${sizeFont}px Arial`
        ctx.fillText(numDeVidas, (308*plano/600), (518*plano/600))
    }
}

function roda() {
    atualiza()
    desenha()

    window.requestAnimationFrame(roda)
}

function main() {
    if(detectar_mobile()){
        plano = 360
    } else {
        plano = setSizePC()
        window.addEventListener('resize',  () => {
            plano = setSizePC()
            padrao = plano / 10
            canvas.width = plano
            canvas.height = plano
            let blocoAtt = bloco.getAtributos()
            bloco.atualizaBloco(blocoAtt.quadroX*padrao, blocoAtt.quadroY*padrao, plano, padrao, true)
        })
    }
    padrao = plano / 10

    setImagem("vamos-la.png")

    canvas = document.createElement('canvas')
    canvas.setAttribute('id', 'canvas')
    canvas.width = plano
    canvas.height = plano
    canvas.style.border = "1px solid #282828";
    ctx = canvas.getContext("2d")

    // Objetos
    estadoJogo = new GameState()
    bloco = new Bloco()
    silabas = new Silabas(estadoJogo, canvas)

    // Sprites
    comecaJogo = new Sprite(canvas, 20, 650, 406, 300);
    perdeuJogo = new Sprite(canvas, 447, 650, 406, 300);
    ganhouJogo = new Sprite(canvas,874, 650, 406, 300);
    spriteBloco = new Sprite(canvas, 620, 0, 60, 60)

    estadoJogo.setState(0)

    document.getElementById('telaCanvas').appendChild(canvas)

    document.body.addEventListener('keydown', (event) => {
        var num = event.keyCode
        mover(num)
    })
    document.getElementById('canvas').addEventListener('click', function() {
        mudaStatusJogo()
    })
    document.querySelectorAll(['.direcoes']).forEach(element => {
        element.addEventListener('mousedown', function() {
            let num = Number(element.getAttribute('direc'))
            mover(num)
        })
    });
    
    roda()
}
main()